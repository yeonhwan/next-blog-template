#!/usr/bin/env node

import chalk from "chalk";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import os from "os";
import { execSync } from "child_process";
import { input, select, confirm } from "@inquirer/prompts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatePath = path.resolve(__dirname, "../template");
const defaultDirectory = path.resolve(process.cwd(), "my-next-blog");

const resolveUserPath = (pjDir) => {
  const targetDir =
    pjDir === "." || pjDir === ""
      ? defaultDirectory
      : pjDir.startsWith("~")
        ? path.join(os.homedir(), pjDir.slice(1))
        : path.resolve(pjDir);

  return targetDir;
};

async function scaffold(pjName, pjDir) {
  const targetDir = resolveUserPath(pjDir);

  if (fs.existsSync(targetDir)) {
    console.error(`❌"${targetDir}" already exists.`);
    process.exit(1);
  }

  try {
    fs.cpSync(templatePath, targetDir, {
      recursive: true,
    });
  } catch (e) {
    console.error(
      `❌"${targetDir}" is not correct directory to scaffold. Check the directories again.`,
    );
    console.log(e);
    process.exit(1);
  }

  const pkgPath = path.join(targetDir, "package.json");

  if (fs.existsSync(pkgPath)) {
    const readPkg = fs.readFileSync(pkgPath, "utf8");
    const pkgJSON = JSON.parse(readPkg);
    pkgJSON.name = pjName;
    const writePkg = JSON.stringify(pkgJSON, null, 2);
    fs.writeFileSync(pkgPath, writePkg);
  } else {
    console.error(`❌ package.json is not found. Something went wrong.`);
    process.exit(1);
  }

  return targetDir;
}

function install(pjDir, manager) {
  if (!pjDir) {
    console.error("`❌ Directory is not passed. Something went wrong.`");
    process.exit(1);
  }

  try {
    switch (manager) {
      case "pnpm":
        execSync("pnpm install", { cwd: pjDir, stdio: "inherit" });
        return;
      case "yarn":
        execSync("yarn install", { cwd: pjDir, stdio: "inherit" });
        return;
      default:
        execSync("npm install", { cwd: pjDir, stdio: "inherit" });
        return;
    }
  } catch (e) {
    if (e.signal === "SIGINT") {
      console.log("⚠️ Installation cancelled. Exiting process.");
      process.exit(1);
    }

    console.error(`❌ Failed to install dependencies using ${manager}`);
    console.error(e);
    process.exit(1);
  }
}

// inquires
// 1. project name
// 2. project path
async function main() {
  console.log(chalk.blueBright("🚀 Trying to install Next-Blog-Template..."));

  const pjName = await input({ message: "What is your project name?" });
  const pjDir = await input({ message: "Where is project to be installed?" });

  console.log(chalk.yellowBright("Scaffolding template directories..."));

  const targetDir = await scaffold(pjName, pjDir);

  console.log(chalk.yellowBright("Scaffolding is complete."));

  const answer = await confirm({
    message: "Do you want to install dependencies?",
  });

  if (answer) {
    const manager = await select({
      message: "Choose your default package manager",
      choices: [
        { name: "npm", value: "npm" },
        { name: "pnpm", value: "pnpm" },
        { name: "yarn", value: "yarn" },
      ],
    });

    console.log(
      chalk.yellowBright(`Installing dependencies by using ${manager}`),
    );
    install(targetDir, manager);
    console.log("✅ Installation is complete.");
  } else {
    console.log(
      "✅ Scaffolding is complete. You can install dependencies by using package manager.",
    );
  }
}

process.on("uncaughtException", (error) => {
  if ((error instanceof Error) & (error.name === "ExitPromptError")) {
    console.log("⚠️ Installation cancelled. Exiting process.");
    process.exit(0);
  } else throw error;
});

process.on("SIGINT", () => {
  console.log("⚠️ Installation cancelled. Exiting process.");
  process.exit(0);
});

main();
