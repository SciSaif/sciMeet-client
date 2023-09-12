// const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//         handleSubmit(e);
//     } else if (e.key === "Tab") {
//         e.preventDefault(); // Prevent the default behavior of the Tab key
//         const { selectionStart, selectionEnd } = e.currentTarget;
//         const currentMessage = e.currentTarget.value;
//         const newMessage =
//             currentMessage.substring(0, selectionStart) +
//             "\t" +
//             currentMessage.substring(selectionEnd);
//         setMessage(newMessage);
//         // Adjust the cursor position after inserting the tab
//         const newSelectionStart = selectionStart + 1;
//         e.currentTarget.setSelectionRange(
//             newSelectionStart,
//             newSelectionStart
//         );
//     }
// };

// function to handle tab press
export const afterTabPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault(); // Prevent the default behavior of the Tab key
    console.log;
    const { selectionStart, selectionEnd } = e.currentTarget;
    const currentMessage = e.currentTarget.value;
    const newMessage =
        currentMessage.substring(0, selectionStart) +
        "\t" +
        currentMessage.substring(selectionEnd);
    // Adjust the cursor position after inserting the tab
    const newSelectionStart = selectionStart + 1;
    e.currentTarget.setSelectionRange(newSelectionStart, newSelectionStart);
    return newMessage;
};
