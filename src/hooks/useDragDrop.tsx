// hooks/useDragAndDrop.js
import { useState, useEffect, useRef } from "react";

const useDragAndDrop = () => {
    const [dragging, setDragging] = useState(false);
    const [files, setFiles] = useState<File[] | null>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);

        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length) {
            setFiles(Array.from(droppedFiles));
        }
    };

    useEffect(() => {
        const mainElement = mainRef.current;

        const handleDragEnterCapture = (e: any) => {
            e.stopPropagation();
            setDragging(true);
        };

        const handleDragLeaveCapture = (e: any) => {
            if (mainElement && !mainElement.contains(e.relatedTarget)) {
                setDragging(false);
            }
        };

        if (mainElement) {
            mainElement.addEventListener(
                "dragenter",
                handleDragEnterCapture,
                true
            );
            mainElement.addEventListener(
                "dragleave",
                handleDragLeaveCapture,
                true
            );
        }

        return () => {
            if (mainElement) {
                mainElement.removeEventListener(
                    "dragenter",
                    handleDragEnterCapture,
                    true
                );
                mainElement.removeEventListener(
                    "dragleave",
                    handleDragLeaveCapture,
                    true
                );
            }
        };
    }, []);

    return {
        dragging,
        files,
        handleDragOver,
        handleDrop,
        mainRef,
        setFiles,
    };
};

export default useDragAndDrop;
