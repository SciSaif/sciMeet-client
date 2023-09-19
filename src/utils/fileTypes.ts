// fileTypeConfig.ts

interface FileTypeConfig {
    identifier: string;
    icon: string;
    mimeTypes?: string[];
    extensions?: string[];
    isCaptionable?: boolean;
}

const fileTypes: FileTypeConfig[] = [
    {
        identifier: "image",
        icon: "", // No icon for images since we'll display the image itself
        mimeTypes: ["image/jpeg", "image/png", "image/gif"], // Add more image MIME types as needed
        isCaptionable: true,
    },
    {
        identifier: "pdf",
        icon: "pdf.png",
        mimeTypes: ["application/pdf"],
    },
    {
        identifier: "docx",
        icon: "docx.png",
        extensions: [".docx"],
    },
    {
        identifier: "audio",
        icon: "audio.png",
        mimeTypes: ["audio/mpeg", "audio/wav"],
    },
    {
        identifier: "other",
        icon: "file.png",
    },
];

export function getFileType(file: File): FileTypeConfig {
    for (const fileType of fileTypes) {
        if (fileType.mimeTypes && fileType.mimeTypes.includes(file.type)) {
            return fileType;
        }
        if (fileType.extensions) {
            for (const ext of fileType.extensions) {
                if (file.name.endsWith(ext)) {
                    return fileType;
                }
            }
        }
    }
    return fileTypes.find((ft) => ft.identifier === "other")!;
}

export default fileTypes;
