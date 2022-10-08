import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor:"#4cd137";
    cardBgColor: string;
  }
}

// 이 파일명속 d.ts 는 declaration file 이라는 뜻이다.