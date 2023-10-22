import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Group {
    _id: string;
    creator_id: string;
    conversation_id: string;
    group_name: string;
    avatar?: string;
    description?: string;
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

        addGroup: (state, action: PayloadAction<Group>) => {
            state.groups.push(action.payload);
        },

        removeGroup: (state, action: PayloadAction<string>) => {
            state.groups = state.groups.filter(
                (group) => group._id !== action.payload
            );
        },

        updateGroup: (state, action: PayloadAction<Group>) => {
            const index = state.groups.findIndex(
                (group) => group._id === action.payload._id
            );
            if (index !== -1) {
                state.groups[index] = action.payload;
            }
        },
        resetState: () => initialState,
    },
});

export const { setGroups, addGroup, removeGroup, updateGroup } =
    groupSlice.actions;
export default groupSlice.reducer;
