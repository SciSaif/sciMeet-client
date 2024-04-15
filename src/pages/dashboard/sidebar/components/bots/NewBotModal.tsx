import React, { useRef, useState } from "react";
import Modal from "../../../../../components/Modal";
import Input from "../../../../../components/Input";
import { useAppSelector } from "../../../../../redux/hooks";

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import {
    useCreateBotMutation,
    useGetBotTypesQuery,
} from "../../../../../redux/features/apis/botApi";

interface Props {
    close: () => void;
}

const NewBotModal = ({ close }: Props) => {
    const { data: botTypes } = useGetBotTypesQuery();
    const [participants, setParticipants] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [botName, setBotName] = useState("");

    const [createBot] = useCreateBotMutation();

    const handleCreate = () => {
        if (participants.length === 0) {
            setError("You must add participants");
            return;
        }
        if (botName === "") {
            setError("Bot name cannot be empty");
            return;
        }

        createBot({
            bot_name: botName,
            participants,
        });
        close();
    };

    return (
        <Modal
            close={close}
            closeIcon
            className="p-5 sm:p-10 w-full sm:w-fit sm:min-w-[400px]"
        >
            <div>
                <h2 className="font-semibold text-lg mb-2 ">New Bot</h2>

                <h3 className="text-sm mb-2">Add Participants</h3>
            </div>

            <div className="mb-2">
                {botTypes?.length === 0 && <div>There are no bots to show</div>}

                {botTypes && botTypes?.length > 0 && (
                    <div>
                        {botTypes.map((botType) => (
                            <div
                                onClick={() => {
                                    setError("");
                                    if (participants.includes(botType._id)) {
                                        // remove
                                        setParticipants((prev) =>
                                            prev.filter(
                                                (id) => id !== botType._id
                                            )
                                        );
                                        return;
                                    }
                                    setParticipants((prev) => [
                                        ...prev,
                                        botType._id,
                                    ]);
                                }}
                                key={botType._id}
                                className="flex flex-row  py-1 hover:bg-black/10 cursor-pointer justify-between items-center"
                            >
                                <div className="flex flex-row gap-x-2  items-center">
                                    <img
                                        src={botType.avatar}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span>{botType.username}</span>
                                </div>
                                <div>
                                    {participants.includes(botType._id) && (
                                        <span className="text-green-500">
                                            <CheckCircleIcon
                                                width={20}
                                                height={20}
                                            />
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-2">
                <Input
                    onChange={(e) => {
                        setBotName(e.target.value);
                    }}
                    value={botName}
                    label="Bot Name"
                    type="text"
                    required
                    className="border-slate-500 py-1 "
                />
            </div>

            {error.length > 0 ? (
                <div className="text-red-500 text-sm mb-2">{error}</div>
            ) : (
                <></>
            )}
            <div className="flex flex-col gap-y-4">
                <button
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
                    onClick={handleCreate}
                >
                    <span className="font-bold ">Create Bot</span>
                </button>
            </div>
        </Modal>
    );
};

export default NewBotModal;
