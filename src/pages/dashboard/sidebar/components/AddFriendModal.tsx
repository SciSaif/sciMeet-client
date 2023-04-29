import React, { useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import { usePostInviteMutation } from "../../../../redux/features/apis/friendApi";
interface Props {
    close: () => void;
}

const AddFriendModal = ({ close }: Props) => {
    const [postInvite, { data, error }] = usePostInviteMutation();
    const [email, setEmail] = useState("");
    const handlePostInvite = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postInvite({ email })
            .unwrap()
            .then(() => {
                close();
            });
    };

    return (
        <Modal close={close} closeIcon>
            <form onSubmit={handlePostInvite} className="text-black mt-4">
                <h2 className="font-bold text-textGray3">Invite a Friend</h2>
                <p className="my-2">
                    Enter e-mail address of friend which you would like to
                    invite
                </p>

                <Input
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    value={email}
                    label="Email"
                    type="email"
                    required
                />
                {error && "data" in error && (
                    <div className="text-white mt-2 text-bold w-full px-2 py-1 rounded-lg bg-red-400">
                        {(error as any)?.data?.message}
                    </div>
                )}
                <button
                    type="submit"
                    className=" mt-4 inline-block rounded bg-primaryAccent px-8 py-2 text-sm w-full font-medium text-white transition  hover:scale-105 focus:outline-none focus:ring focus:ring-primaryAccent active:bg-primaryAccentLighter"
                >
                    Add Friend
                </button>
            </form>
        </Modal>
    );
};

export default AddFriendModal;
