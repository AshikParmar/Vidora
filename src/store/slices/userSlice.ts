import { UserState } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
    username: '',
    email: '',
    avatar: '',
    createdAt: undefined,
    updatedAt: undefined,
    _id: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
            state._id = action.payload._id;
        },
        clearUser(state) {
            state = initialState;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
