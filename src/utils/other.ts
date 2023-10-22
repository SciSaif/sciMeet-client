import { saveAs } from "file-saver";
import { Friend } from "../redux/features/slices/friendSlice";
import { Group } from "../redux/features/slices/groupSlice";

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

// typeGuard function to check if selectedChat is a friend or a group
export const isGroup = (selectedChat: any): selectedChat is Group => {
    return "group_name" in selectedChat;
};
