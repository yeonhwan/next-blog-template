/** 
  You can decalre local font source here 
  Roboto is used as example
**/

import localFont from "next/font/local";

export const MyFont = localFont({
  preload: true,
  src: [
    {
      path: "./assets/fonts/Roboto-VariableFont.ttf",
      // weight: "",
      // style: "",
    },
  ],
  variable: "--my-font",
});
