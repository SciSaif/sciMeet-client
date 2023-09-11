// let unreadMessages = 0;
// // loop through messaegs from the end until we find a message which has been read by user, count all the unread messages
// if (messages && user && messages.length > 0) {
//     // skip if author of message is current user
//     if (
//         messages[messages.length - 1].author._id !== user._id &&
//         !messages[messages.length - 1].seenBy.find(
//             (u) => u.userId === user._id
//         )
//     ) {
//         unreadMessages = 1;
//     }
// }

import { IMessage } from "../redux/features/slices/chatSlice";
import { store } from "../redux/store";

// let unreadMessages = 0;
// // loop through messaegs from the end until we find a message which has been read by user, count all the unread messages
// if (messages && user) {
//     for (let i = messages.length - 1; i >= 0; i--) {
//         // skip if author of message is current user
//         if (messages[i].author._id === user._id) {
//             continue;
//         }
//         if (messages[i].seenBy.find((u) => u.userId === user._id)) {
//             break;
//         }
//         unreadMessages++;
//     }
// }

// function to count the unreadMessages , second parameter gives the range to run the for loop
export const countUnreadMessages = (
    messages?: IMessage[],
    checkOnlyLast?: boolean
) => {
    const userId = store.getState().auth.user?._id;

    if (!userId || !messages || messages.length === 0) return 0;

    let n = messages.length;

    if (checkOnlyLast) {
        if (messages[n - 1].author._id === userId) return 0;
        return messages[n - 1].seenBy.find((u) => u.userId === userId) ? 0 : 1;
    }
    let unreadMessages = 0;
    for (let i = n - 1; i >= 0; i--) {
        // skip if author of message is current user
        if (messages[i].author._id === userId) {
            continue;
        }
        if (messages[i].seenBy.find((u) => u.userId === userId)) {
            break;
        }
        unreadMessages++;
    }

    return unreadMessages;
};
