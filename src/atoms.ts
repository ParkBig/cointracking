import {atom} from "recoil";

export const isDarkAtom = atom({
    key:"isDark",
    default: false, // 이게 밸류 즉 state 다
})