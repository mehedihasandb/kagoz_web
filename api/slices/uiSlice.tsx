import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthView = "login" | "register";

type UIState = {
  loginOpen: boolean;
  redirectPath: string | null;
  authView: AuthView;
};

const initialState: UIState = {
  loginOpen: false,
  redirectPath: null,
  authView: "login",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openLogin(
      state,
      action: PayloadAction<{ redirect?: string; view?: AuthView } | undefined>
    ) {
      state.loginOpen = true;
      state.redirectPath = action?.payload?.redirect ?? null;
      state.authView = action?.payload?.view ?? "login";
    },
    openRegister(
      state,
      action: PayloadAction<{ redirect?: string } | undefined>
    ) {
      state.loginOpen = true;
      state.redirectPath = action?.payload?.redirect ?? null;
      state.authView = "register";
    },
    setAuthView(state, action: PayloadAction<AuthView>) {
      state.authView = action.payload;
    },
    closeLogin(state) {
      state.loginOpen = false;
      state.redirectPath = null;
    },
  },
});

export const { openLogin, openRegister, setAuthView, closeLogin } = uiSlice.actions;
export default uiSlice.reducer;
