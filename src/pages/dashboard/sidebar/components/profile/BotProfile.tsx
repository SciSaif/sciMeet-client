import { useState } from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
    useDeleteBotMutation,
    useUpdateBotMutation,
} from "../../../../../redux/features/apis/botApi";

const BotProfile = () => {
    const profile = useAppSelector((state) => state.other.profile);
    const bot = useAppSelector((state) => {
        return state.bot.bots.find((bot) => bot._id === profile.id);
    });
    if (!bot) return <></>;
    const friends = useAppSelector((state) => state.friend.friends);
    const participants = useAppSelector((state) => {
        return state.chat.conversations.find(
            (conversation) => conversation._id === bot.conversation_id
        )?.participants;
    });

    let friendsInBot = friends?.filter((friend) => {
        return participants?.includes(friend._id);
    });

    // add current user to friendsInBot
    const user = useAppSelector((state) => state.auth.user);
    if (user) {
        friendsInBot = [
            {
                _id: user._id,
                username: user.username || "user",
                isOnline: false,
                conversation_id: "",
                avatar: user.avatar,
            },
            ...friendsInBot,
        ];
    }

    const isBotAdmin = bot.creator_id === user?._id;

    const [newBotName, setNewBotName] = useState(bot.bot_name || "");
    const [editNameMode, setEditNameMode] = useState(false);
    const [newBotDescription, setNewBotDescription] = useState(
        bot.description || ""
    );
    const [editDescriptionMode, setEditDescriptionMode] = useState(false);

    const [deleteBot] = useDeleteBotMutation();
    const [updateBot] = useUpdateBotMutation();

    return (
        <div className="w-full overflow-auto h-full scrollbar flex flex-col pt-10">
            <div className="w-full flex justify-center flex-col items-center">
                <img
                    className="h-44 w-44 "
                    src={bot?.avatar ? bot.avatar : "bot.png"}
                    alt="dp"
                />

                <div className="text-white/80 flex flex-row gap-x-2 items-center mt-2">
                    {editNameMode ? (
                        <div className="flex flex-row gap-x-2 items-center">
                            <textarea
                                className="bg-transparent  border-b border-white/50 focus:border-white/75 focus:outline-none"
                                value={newBotName}
                                onChange={(e) => setNewBotName(e.target.value)}
                            />
                            <div
                                onClick={() => {
                                    setEditNameMode(false);
                                    updateBot({
                                        bot_id: bot._id,
                                        bot_name: newBotName,
                                    });
                                }}
                                className="opacity-60 hover:opacity-100 cursor-pointer mt-1"
                            >
                                <CheckIcon width={16} />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="text-2xl">{bot.bot_name}</div>
                            {isBotAdmin && (
                                <div
                                    onClick={() => {
                                        setEditNameMode(true);
                                    }}
                                    className="opacity-60 hover:opacity-100 cursor-pointer mt-1"
                                >
                                    <PencilIcon width={16} />
                                </div>
                            )}
                        </>
                    )}
                </div>
                <p className="text-sm text-text">Bot</p>
            </div>
            <div className="bg-black/10 mt-3 px-5 py-2">
                <div className="text-text2  text-sm mb-2  w-full mt-3 font-semibold">
                    Description
                </div>
                {isBotAdmin ? (
                    <div>
                        {" "}
                        {editDescriptionMode ? (
                            <div className="flex flex-row gap-x-2 text-text items-center">
                                <textarea
                                    className="bg-transparent border-b border-white/50 focus:border-white/75 focus:outline-none"
                                    value={newBotDescription}
                                    onChange={(e) =>
                                        setNewBotDescription(e.target.value)
                                    }
                                />
                                <div
                                    onClick={() => {
                                        setEditDescriptionMode(false);
                                        updateBot({
                                            bot_id: bot._id,
                                            description: newBotDescription,
                                        });
                                    }}
                                    className="opacity-60 hover:opacity-100 cursor-pointer mt-1"
                                >
                                    <CheckIcon width={16} />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-row text-text gap-x-2 items-center">
                                <p
                                    onClick={() => {
                                        setEditDescriptionMode(true);
                                    }}
                                    className="text-text text-sm cursor-pointer"
                                >
                                    {bot?.description
                                        ? bot.description
                                        : "Click here to add a description"}
                                </p>
                                <div
                                    onClick={() => {
                                        setEditDescriptionMode(true);
                                    }}
                                    className="opacity-60 hover:opacity-100 cursor-pointer mt-1"
                                >
                                    <PencilIcon width={16} />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {" "}
                        <p className="text-text text-sm ">
                            {bot?.description
                                ? bot.description
                                : "No bot description"}
                        </p>
                    </div>
                )}
            </div>
            <div className="mt-5 px-5 bg-black/10 ">
                <h4 className="text-text2  text-sm mb-2  w-full mt-3 font-semibold">
                    Participants
                </h4>
                {friendsInBot?.length > 0 && (
                    <div>
                        {friendsInBot.map((friend) => (
                            <div
                                key={friend._id}
                                className="flex flex-row text-text py-1 hover:bg-black/10 cursor-pointer justify-between items-center"
                            >
                                <div className="flex flex-row gap-x-2  items-center">
                                    <img
                                        src={friend.avatar}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span>{friend.username}</span>
                                </div>
                                {bot.creator_id === friend._id && (
                                    <div>Admin</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isBotAdmin && (
                <div className="bg-black/10 mt-3 px-5">
                    <div
                        onClick={() => deleteBot(bot._id)}
                        className="text-red-500 flex flex-row gap-2 py-2 cursor-pointer hover:text-red-600"
                    >
                        <TrashIcon width={20} />
                        Delete Bot
                    </div>
                </div>
            )}
        </div>
    );
};

export default BotProfile;
