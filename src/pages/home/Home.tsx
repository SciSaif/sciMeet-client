import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import TestAccount from "../../components/TestAccount";

const Home = () => {
    return (
        <div className="w-full md:w-3/4 lg:w-2/3 flex pt-[75px] flex-col justify-center  items-center mx-auto h-screen text-black dark:text-white">
            <div className="flex flex-col mx-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug">
                    Instantly Chat and Video Call with Friends
                </h1>
                <p className="mt-8 text-textGray mb-5 text-lg leading-snug font-semibold  tracking-wider">
                    Experience the joy of live conversations with your friends
                    and family anytime, anywhere.
                </p>

                <TestAccount />

                {/* get started button */}
                <div className="mt-8">
                    <Link
                        to="/register"
                        className="bg-blue-500 text-white flex flex-row w-fit items-center gap-x-4 hover:bg-blue-600 rounded-lg pl-10 pr-5 py-2"
                    >
                        Get Started <ArrowRightIcon width="20" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
