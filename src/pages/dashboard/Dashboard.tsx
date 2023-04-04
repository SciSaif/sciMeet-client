import React, { useState } from "react";
import { useTestQuery } from "../../redux/features/apis/authApi";

const Dashboard = () => {
    const { data } = useTestQuery();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-bgColor h-screen flex flex-row relative overflow-hidden">
            <div
                className={`bg-red-500 h-screen w-full transition-all  md:absolute md:top-0 md:left-0 `}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit quibusdam consequuntur beatae deserunt. Reprehenderit
                blanditiis laboriosam porro sit ut, consectetur officiis
                consequatur impedit nihil eaque labore libero sapiente fuga.
                Quisquam quo eaque aliquid distinctio, tenetur quia voluptate,
                maxime eveniet quibusdam quod iusto, ratione excepturi dolorum
            </div>

            <div
                className={`bg-green-500 h-screen w-full md:w-fit   transition-all ease-out   md:absolute md:top-0 ${
                    isOpen
                        ? "translate-x-[calc(100%-60px)] md:translate-x-0 md:left-[400px] "
                        : "translate-x-0 md:translate-x-0 md:left-0"
                } `}
            >
                <div className="fixed border-b border-gray-700 h-10 w-full bg-blue-500">
                    <button
                        className="bg-pink-500 h-full  w-10"
                        onClick={toggle}
                    >
                        pr
                    </button>
                </div>
                <div className="bg-gray-300 h-screen w-full pt-10">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus expedita ullam debitis odio pariatur! Explicabo
                    in nulla omnis asperiores distinctio expedita, harum dolore
                    exercitationem ad atque eos consectetur culpa ipsa.
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
