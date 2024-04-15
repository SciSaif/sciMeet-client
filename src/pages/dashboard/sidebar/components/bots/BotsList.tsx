import FriendsListItem from "../friends/FriendsListItem";
import { useAppSelector } from "../../../../../redux/hooks";
import {
    Friend,
    OnlineUser,
} from "../../../../../redux/features/slices/friendSlice";
import BotListItem from "./BotListItem";

const BotsLists = () => {
    const bots = useAppSelector((state) => state.bot.bots);

    return (
        <div className="overflow-auto scrollbar flex-grow mb-5">
            <h4 className="text-text2  text-sm text-center w-full mt-1 font-semibold">
                Bots
            </h4>

            <div className="mt-4 pl-4 grid gap-y-2">
                {bots?.map((bot) => (
                    <BotListItem key={bot._id} bot={bot} />
                ))}
            </div>
        </div>
    );
};

export default BotsLists;
