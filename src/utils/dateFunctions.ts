export function toReadableDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    let formattedDate = "";

    if (diff < oneDay && now.getDate() === date.getDate()) {
        formattedDate = `Today at ${date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    } else if (diff < oneDay * 2 && now.getDate() - date.getDate() === 1) {
        formattedDate = `Yesterday at ${date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    } else {
        formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
        )}`;
    }

    return formattedDate;
}

//function to compare two dates and return true if they are the same day, time is ignored
// date format is 2023-04-29T00:09:20.796Z
export function isSameDay(date1: string, date2: string): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}
