import useHasFocus from "../../../hooks/useHasFocus";
import { seenMessages } from "../../../realtimeCommunication/socketHandler";
import {
    IConversation,
    IMessage,
} from "../../../redux/features/slices/chatSlice";
import { store } from "../../../redux/store";
import { isSameDay } from "../../../utils/dateFunctions";

export const markMessagesAsSeen = (
    lastMessageIntersecting: boolean,
    windowInFocus: boolean,
    conversation?: IConversation | null
) => {
    const userId = store.getState().auth.user?._id;

    const messages = conversation?.messages;

    if (!conversation || !messages || messages.length === 0 || !userId) {
        return;
    }
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.author._id === userId) {
        return;
    }
    // Check if the last message is seen already or not
    let isSeen = false;
    for (const seenBy of lastMessage.seenBy) {
        if (seenBy.userId === userId) {
            isSeen = true;
            break;
        }
    }
    if (lastMessageIntersecting && !isSeen && windowInFocus) {
        console.log("read all messages");
        seenMessages({ conversationId: conversation._id });
    }
};

// function to check if we should merge messages
export const shouldMergeMessages = (index: number, messages: IMessage[]) => {
    return (
        index > 0 &&
        messages[index].author._id === messages[index - 1].author._id &&
        isSameDay(messages[index].date, messages[index - 1].date)
    );
};
