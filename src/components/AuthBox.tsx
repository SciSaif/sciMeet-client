import React from "react";

interface Props {
    children: React.ReactNode;
}

const AuthBox = (props: Props) => {
    return <div className="rounded bg-black w-[700px]">{props.children}</div>;
};

export default AuthBox;
