import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import ChatBeginningHeader from "./ChatBeginningHeader";
import Message from "./Message";

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
    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );

    return (
        <div className="max-h-screen scrollbar pb-20 overflow-auto  w-full  px-5  ">
            {selectedFriend === undefined && (
                <div className="flex w-full items-center justify-center h-full text-textGray font-semibold">
                    To start chatting, select a friend from the sidebar
                </div>
            )}
            {selectedFriend !== undefined && (
                <div className="">
                    <ChatBeginningHeader friend={selectedFriend} />
                    <div className="gap-y-2 flex flex-col ">
                        {DUMMY_MESSAGESS.map((message) => (
                            <Message message={message} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
