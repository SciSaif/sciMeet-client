import React, { useEffect, useState } from "react";
import { IMessage } from "../../../../redux/features/slices/chatSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { getChatHistory } from "../../../../realtimeCommunication/socketHandler";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
interface Props {
    messages?: IMessage[];
}

const LoadMoreMessages = ({ messages }: Props) => {
    const [lastMessageId, setLastMessageId] = useState<string | null>(null);

    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );
    useEffect(() => {
        // this is to prevent fetching more messages while more messages are being fetched
        if (
            messages &&
            messages.length > 0 &&
            messages[0]._id !== lastMessageId
        ) {
            setLastMessageId(null);
        }
    }, [messages]);
    const { targetRef, isIntersecting } = useIntersectionObserver({
        threshold: 0, // Adjust this threshold as needed
    });

    useEffect(() => {
        if (isIntersecting && selectedFriend && !lastMessageId) {
            getMoreMessages();
        }
    }, [isIntersecting, selectedFriend]);

    const getMoreMessages = () => {
        if (selectedFriend && messages && messages.length > 0) {
            setLastMessageId(messages[0]._id);
            getChatHistory(selectedFriend._id, messages[0]._id);
        }
    };

    if (!messages || messages.length === 0 || messages[0]?.firstMessage)
        return <></>;
    return (
        <div
            ref={targetRef}
            onClick={getMoreMessages}
            className="w-full min-h-[100px]  flex flex-col justify-center items-center text-text1 font-semibold "
        >
            <div className=" rounded-full  group-hover:rotate-6 animate-spin">
                <img
                    className="h-10 w-10 rounded-full filter"
                    src={"avatars/pikachu.png"}
                    alt="loading"
                />
            </div>
            <div className="text-text1/50 text-sm">Loading more messages</div>
        </div>
    );
};

export default LoadMoreMessages;
