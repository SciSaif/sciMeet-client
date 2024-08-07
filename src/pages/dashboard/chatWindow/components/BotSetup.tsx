import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../../components/Input";
import { createPrompt } from "../../../../utils/promptGenerator";
import { sendDirectMessage } from "../../../../realtimeCommunication/socketHandlers/chat";
import { useAppSelector } from "../../../../redux/hooks";
import TextareaAutosize from "react-textarea-autosize";
import { afterTabPress } from "./chatFunctions";
import { RefreshCcw } from "lucide-react";

const Form = z.object({
    relation: z.string().min(1, "Relation is required"),
    time: z.string().min(1, "Time is required"),
    bot_name: z.string().min(1, "Bot name is required"),
    my_name: z.string().min(1, "Your name is required"),
    bot_age: z.number().positive("Bot age should be a positive number"),
    bot_gender: z.string().min(1, "Bot gender is required"),
    adjectives: z.string().min(1, "Bot gender is required"),
    my_age: z.number().positive("Your age should be a positive number"),
    my_gender: z.string().min(1, "Your gender is required"),
    first_message: z.string().min(1, "First message is required"),
});

type FormType = z.infer<typeof Form>;

const BotSetup = () => {
    const selectedChat = useAppSelector((state) => state.other.selectedChat);
    const conversation_id = selectedChat?.conversation_id;
    const bot = useAppSelector((state) =>
        state.bot.bots.find((bot) => bot.conversation_id === conversation_id)
    );
    const bot_name = bot?.bot_name;

    const [customPrompt, setCustomPrompt] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm<FormType>({
        resolver: zodResolver(Form),
        defaultValues: {
            relation: "friend",
            time: "10 years",
            bot_name: bot_name,
            my_name: "Saif",
            bot_age: 19,
            my_age: 23,
            bot_gender: "female",
            my_gender: "male",
            adjectives: "funny, smart",
            first_message: "hi, whats up?",
        },
    });
    const formData = watch();

    const [prompt, setPrompt] = useState<string>("");
    useEffect(() => {
        if (!formData || customPrompt) return;
        setPrompt(createPrompt(formData));
    }, [formData]);

    const onSubmit = (data: FormType) => {
        if (!selectedChat || !prompt) return;
        console.log(data);
        sendDirectMessage({
            content: prompt,
            conversation_id: selectedChat?.conversation_id,
        });
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
        } else if (e.key === "Tab") {
            console.log("tab");
            setPrompt(afterTabPress(e));
        }
    };
    const swapGender = (gender: "bot_gender" | "my_gender") => {
        const currentGender = getValues(gender);
        let newGender = currentGender === "female" ? "male" : "female";
        setValue(gender, newGender);
    };

    return (
        <div className="rounded-lg  p-4">
            <h2 className="text-xl font-semibold border-b border-slate-100/50 pb-2 text-text text-center mb-5">
                Bot Setup
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                {!customPrompt && (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type="text"
                                label="Bot Name"
                                error={errors.bot_name}
                                variant="2"
                                {...register("bot_name")}
                            />

                            <Input
                                type="text"
                                label="My Name"
                                error={errors.my_name}
                                variant="2"
                                {...register("my_name")}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type="number"
                                label="Bot Age"
                                error={errors.bot_age}
                                variant="2"
                                {...register("bot_age", {
                                    valueAsNumber: true,
                                })}
                            />

                            <Input
                                type="number"
                                label="My Age"
                                error={errors.my_age}
                                variant="2"
                                {...register("my_age", { valueAsNumber: true })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <Input
                                    type="text"
                                    label="Bot Gender"
                                    error={errors.bot_gender}
                                    variant="2"
                                    {...register("bot_gender")}
                                />
                                <RefreshCcw
                                    onClick={() => {
                                        swapGender("bot_gender");
                                    }}
                                    className="text-text hover:text-white  cursor-pointer active:rotate-45 right-2 hover: absolute top-1/2 -translate-y-1/2"
                                    size={16}
                                />
                            </div>
                            <div className="relative">
                                <Input
                                    type="text"
                                    label="My Gender"
                                    error={errors.my_gender}
                                    variant="2"
                                    {...register("my_gender")}
                                />
                                <RefreshCcw
                                    onClick={() => {
                                        swapGender("my_gender");
                                    }}
                                    className="text-text hover:text-white  cursor-pointer active:rotate-45 right-2 hover: absolute top-1/2 -translate-y-1/2"
                                    size={16}
                                />
                            </div>
                        </div>
                        <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4">
                            <Input
                                type="text"
                                label="relation"
                                error={errors.relation}
                                variant="2"
                                {...register("relation")}
                            />

                            <Input
                                type="text"
                                label="How long do you know each other?"
                                error={errors.time}
                                variant="2"
                                {...register("time")}
                            />
                        </div>

                        <Input
                            type="text"
                            label="Adjectives describing the bot e.g. (smart, funny)"
                            variant="2"
                            {...register("adjectives")}
                        />

                        {/* First Message */}
                        <Input
                            type="text"
                            label="First Message"
                            error={errors.first_message}
                            variant="2"
                            {...register("first_message")}
                        />
                    </>
                )}
                <div>
                    <h3 className=" text-text flex justify-between">
                        Prompt:{" "}
                        <span
                            onClick={() => {
                                if (customPrompt)
                                    setPrompt(createPrompt(formData));
                                setCustomPrompt((prev) => !prev);
                            }}
                            className="text-sm underline cursor-pointer underline-offset-2 hover:text-secondary"
                        >
                            {customPrompt
                                ? "go back to prompt generator"
                                : "click here for custom prompt"}
                        </span>
                    </h3>
                    {!customPrompt && (
                        <p className="text-xs text-text">{prompt}</p>
                    )}
                </div>
                {customPrompt && (
                    <TextareaAutosize
                        placeholder="Prompt"
                        // variant="2"
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        value={prompt}
                        className="w-full  resize-none pl-1 rounded-l-xl border-0 pr-10 bg-transparent overflow-y-auto overflow-x-hidden  scrollbar max-h-[300px]  focus:ring-0 placeholder:text-text2/50 outline-none  active:outline-none text-text2"
                    />
                )}

                <button
                    type="submit"
                    className="bg-secondary  text-white rounded px-4 py-2"
                >
                    Lets go!
                </button>
            </form>
        </div>
    );
};

export default BotSetup;
