import React from "react";
import CopyButton from "./CopyButton";

const TestAccount = () => {
    return (
        <div className=" border-2 border-blue-600 w-fit gap-5 px-10 flex flex-col items-start p-2 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row items-start sm:justify-center gap-2 sm:gap-4">
                Test Account 1:
                <div className="flex justify-center gap-4">
                    email: saiflll284@gmail.com
                    <CopyButton text="saiflll284@gmail.com" />
                </div>
                <div className="flex justify-center gap-4">
                    password: 123456
                    <CopyButton text="123456" />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:justify-center gap-2 sm:gap-4">
                Test Account 2:
                <div className="flex justify-center gap-4">
                    email: scisaif1@gmail.com
                    <CopyButton text="scisaif1@gmail.com" />
                </div>
                <div className="flex justify-center gap-4">
                    password: 123456
                    <CopyButton text="123456" />
                </div>
            </div>
        </div>
    );
};

export default TestAccount;
