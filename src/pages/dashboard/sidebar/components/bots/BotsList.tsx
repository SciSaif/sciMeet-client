import FriendsListItem from "../friends/FriendsListItem";
import { useAppSelector } from "../../../../../redux/hooks";
import {
    Friend,
    OnlineUser,
} from "../../../../../redux/features/slices/friendSlice";
import BotListItem from "./BotListItem";
import { useState } from "react";
import NewBotModal from "./NewBotModal";

const BotsLists = () => {
    const bots = useAppSelector((state) => state.bot.bots);
    const noBots = !bots || bots.length === 0;
    const [showAddBotModal, setShowAddBotModal] = useState(false);
    return (
        <div className="overflow-auto scrollbar flex-grow mb-5">
            <h4 className="text-text2  text-sm text-center w-full mt-3 font-semibold">
                Bots
            </h4>

            <div className="mt-4 pl-4 grid gap-y-2">
                {bots?.map((bot) => (
                    <BotListItem key={bot._id} bot={bot} />
                ))}

                {noBots && (
                    <div className="text-text1 text-center text-sm">
                        No Bot yet
                        <div className="px-4 mt-5">
                            <button
                                onClick={() => setShowAddBotModal(true)}
                                className="inline-block  rounded bg-slate-500 px-8  py-2 text-sm w-full font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring focus:ring-slate-500 active:bg-slate-600"
                            >
                                Create a bot
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {showAddBotModal && (
                <NewBotModal close={() => setShowAddBotModal(false)} />
            )}
        </div>
    );
};

export default BotsLists;
