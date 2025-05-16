"use server";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/** This is where your backend function lives for Next JS
 All functions would be executed as a server function by Next inside server
 You can use server function inside RSC to load data

 Change functions body with your own implementation
 **/

export async function getAllPosts(): Promise<any> {
  return [getPost("example")];
}

export async function getPost(slug: string): Promise<any> {
  const exampleMarkdown = path.join(path.dirname(fileURLToPath(import.meta.url)), "./example.md");
  return {
    slug,
    source: fs.readFileSync(exampleMarkdown),
  };
}
