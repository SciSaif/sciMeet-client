import { saveAs } from "file-saver";

// function to return an array element at a random index
export const randomElement = (arr: any[]) =>
    arr[Math.floor(Math.random() * arr.length)];

export function getCurrentTimeInMilliseconds() {
    return new Date().getTime();
}

export const downloadFile = (url?: string, fileName?: string) => {
    if (!url || !fileName) return;
    saveAs(url, fileName);
};
