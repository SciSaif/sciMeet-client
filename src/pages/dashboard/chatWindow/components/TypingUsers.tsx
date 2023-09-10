import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";

const TypingUsers = () => {
    const [typingUsers, setTypingUsers] = useState<string[]>([]);

    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );

    const typingUserIds = useAppSelector((state) => {
        return (
            state.chat.typingStatus.find(
                (status) =>
                    status.conversationId === selectedFriend?.conversationId
            )?.typingUsers || []
        );
    });

    const friends = useAppSelector((state) => state.friend.friends);

    useEffect(() => {
        // get the usernames of typing users using userids in friends
        const newTypingUsers = typingUserIds.map((userId) => {
            const friend = friends.find((f) => f._id === userId);
            return friend?.username || userId;
        });
        if (typingUsers.length === 0 && newTypingUsers.length === 0) {
            return;
        }

        setTypingUsers(newTypingUsers);
    }, [typingUserIds, friends]);

    if (typingUsers.length === 0) return <></>;
    return (
        <div>
            <p className="text-text1 text-sm py-2 px-3">
                {typingUsers.join(", ") +
                    (typingUsers.length > 1 ? " are " : " is ")}{" "}
                {"typing"}
            </p>
        </div>
    );
};

export default TypingUsers;
