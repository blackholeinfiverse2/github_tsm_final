import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define initial state
interface AuthState {
  user: { email: string } | null;
  isSidebarOpen: boolean;
}

const initialState: AuthState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  isSidebarOpen: false,
};

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.user = { email: action.payload.email };
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

// Export the actions
export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
