import { createSlice } from "@reduxjs/toolkit";

interface IThemeState{
    theme: string
    isDarkMode: boolean
}
const initialState: IThemeState = {
    theme: "light",
    isDarkMode: false,
}
const themeSlice  = createSlice(
    {
    name: "theme",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode =!state.isDarkMode;
        },
        changeTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
    }
)

export const { toggleDarkMode, changeTheme } = themeSlice.actions;

export default themeSlice.reducer;