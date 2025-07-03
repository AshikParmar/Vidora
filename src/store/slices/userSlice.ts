import { IUser } from '@/models/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = Omit<IUser, "password">;

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
            state = action.payload;
        },
        clearUser(state) {
            state = initialState;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
