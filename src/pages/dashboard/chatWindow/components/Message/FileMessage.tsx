import { IMessage } from "../../../../../redux/features/slices/chatSlice";
import fileTypes from "../../../../../utils/fileTypes";
import { downloadFile } from "../../../../../utils/other";

interface Props {
    message: IMessage;
}

const FileMessage = ({ message }: Props) => {
    const currentFileType = fileTypes.find(
        (ft) => ft.identifier === message.fileType
    );

    return (
        <div
            onClick={() => downloadFile(message.file, message.fileName)}
            className={`rounded-xl my-2 w-full  items-center cursor-pointer bg-primary-700 flex flex-row gap-2 py-2 px-2 overflow-hidden max-w-[350px] ${
                message.content.length === 0 && "rounded-b-xl"
            }`}
        >
            {currentFileType && currentFileType.icon && (
                <img
                    className="w-10"
                    src={currentFileType.icon}
                    alt={currentFileType.identifier}
                />
            )}
            {message.fileName && (
                <p className="py-1 px-2 break-words  ">{message.fileName}</p>
            )}
        </div>
    );
};

export default FileMessage;
