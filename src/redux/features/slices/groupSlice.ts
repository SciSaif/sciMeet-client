import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Group {
    _id: string;
    creator_id: string;
    conversation_id: string;
    group_name: string;
    avatar?: string;
}

interface initialStateProps {
    groups: Group[];
}

const initialState: initialStateProps = {
    groups: [],
};

export const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        setGroups: (state, action: PayloadAction<Group[]>) => {
            state.groups = action.payload;
        },
        resetState: () => initialState,
    },
});

export const { setGroups } = groupSlice.actions;
export default groupSlice.reducer;
