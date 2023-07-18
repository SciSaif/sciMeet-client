// import resolveConfig from "tailwindcss/resolveConfig";
// // @ts-ignore
// import { theme } from "../../tailwind.config.cjs";

// // const fullConfig = resolveConfig(tailwindConfig);

// export const getBreakpointValue = (value: string): number => {
//     // @ts-ignore
//     return fullConfig.theme.screens[value].slice(
//         0,
//         theme.screens[value].indexOf("px")
//     );
// };

// export const getCurrentBreakpoint = (): string => {
//     let currentBreakpoint: string = "sm";
//     let biggestBreakpointValue = 0;
//     if (theme?.screens) {
//         for (const breakpoint of Object.keys(theme.screens)) {
//             const breakpointValue = getBreakpointValue(breakpoint);
//             if (
//                 breakpointValue > biggestBreakpointValue &&
//                 window.innerWidth >= breakpointValue
//             ) {
//                 biggestBreakpointValue = breakpointValue;
//                 currentBreakpoint = breakpoint;
//             }
//         }
//     }
//     return currentBreakpoint;
// };
