import React, { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import ChatBeginningHeader from "./ChatBeginningHeader";
import Message from "./Message";
import {
    useDirectMessageMutation,
    useGetMessageHistoryQuery,
} from "../../../redux/features/apis/chatApi";

const DUMMY_MESSAGESS = [
    {
        id: 1,
        content: "Hello",
        sameAuthor: "false",
        username: "Marek",
        date: "22/01/2022",
        sameDay: false,
    },
    {
        id: 2,
        content: "How are you?",
        sameAuthor: "true",
        username: "Marek",
        date: "22/01/2022",
        sameDay: true,
    },
    {
        id: 3,
        content: "I'm good, thanks!",
        sameAuthor: "false",
        username: "Sarah",
        date: "23/01/2022",
        sameDay: false,
    },
    {
        id: 4,
        content: "What are you up to today?",
        sameAuthor: "true",
        username: "Marek",
        date: "23/01/2022",
        sameDay: true,
    },
    {
        id: 5,
        content: "Not much, just hanging out at home. How about you?",
        sameAuthor: "false",
        username: "Sarah",
        date: "23/01/2022",
        sameDay: true,
    },
    {
        id: 6,
        content:
            "I have a meeting in the morning and then I'm going to the gym.",
        sameAuthor: "true",
        username: "Marek",
        date: "23/01/2022",
        sameDay: true,
    },
    {
        id: 7,
        content: "Sounds like a productive day!",
        sameAuthor: "false",
        username: "Sarah",
        date: "23/01/2022",
        sameDay: true,
    },
    {
        id: 8,
        content:
            "Yeah, I'm trying to stay on top of things. What are your plans for the weekend?",
        sameAuthor: "true",
        username: "Marek",
        date: "23/01/2022",
        sameDay: true,
    },
    {
        id: 9,
        content: "I'm not sure yet. Maybe I'll go see a movie or something.",
        sameAuthor: "false",
        username: "Sarah",
        date: "23/01/2022",
        sameDay: true,
    },
    {
        id: 10,
        content: "That sounds fun. Let me know if you need someone to go with!",
        sameAuthor: "true",
        username: "Marek",
        date: "23/01/2022",
        sameDay: true,
    },
    {
        id: 11,
        content:
            "Hey, did you hear about the new restaurant that just opened up downtown?",
        sameAuthor: "true",
        username: "Marek",
        date: "24/01/2022",
        sameDay: false,
    },
    {
        id: 12,
        content: "No, I haven't. What's it called?",
        sameAuthor: "false",
        username: "Sarah",
        date: "24/01/2022",
        sameDay: false,
    },
];

const ChatWindow = () => {
    const [message, setMessage] = useState("");
    const [sendDirectMessage] = useDirectMessageMutation();

    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );
    const { data: messages } = useGetMessageHistoryQuery(
        {
            receiverUserId: selectedFriend?._id ? selectedFriend._id : "",
        },
        { skip: !selectedFriend?._id }
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedFriend) return;
        setMessage("");
        sendDirectMessage({
            content: message,
            receiverUserId: selectedFriend._id,
        });
    };

    console.log("messages", selectedFriend?.username, messages);

    return (
        <main className="max-h-screen  pt-14 h-screen flex flex-col  justify-end   overflow-auto  scrollbar w-full    ">
            {selectedFriend === undefined && (
                <div className="flex w-full items-center justify-center h-full text-textGray font-semibold">
                    To start chatting, select a friend from the sidebar
                </div>
            )}
            {selectedFriend !== undefined && (
                <div className="flex flex-col-reverse   overflow-auto scrollbar px-5 ">
                    <div className=" flex flex-col pb-5">
                        {messages?.map((message, index) => {
                            const sameAuthor =
                                index > 0 &&
                                messages[index].author._id ===
                                    messages[index - 1].author._id;
                            return (
                                <Message
                                    message={message}
                                    sameAuthor={sameAuthor}
                                />
                            );
                        })}
                    </div>
                    <ChatBeginningHeader friend={selectedFriend} />
                </div>
            )}
            {selectedFriend !== undefined && (
                <form onSubmit={handleSubmit} className="pb-5  w-full  px-5">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder={`Message ${selectedFriend?.username}`}
                        className="w-full rounded-xl border-0 bg-[#393A3A] focus:ring-0 placeholder:text-textGray/50 outline-none  active:outline-none text-textGray"
                    />
                </form>
            )}
        </main>
    );
};

export default ChatWindow;
