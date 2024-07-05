import { createSlice } from "@reduxjs/toolkit";


const userStore = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem('token_key') || "",
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem('token_key', action.payload)
    },
  },
});

const { setToken } = userStore.actions;

const userReducer = userStore.reducer;

// 异步方法，登录获取token
const fetchToken = (loginForm) => {
  return async (dispatch) => {
    const res = await http.post('/authorizations', loginForm)
    // const res = await http.post('/user/login', loginForm)
    // 提交同步action进行token保存
    dispatch(setToken(res.data.token))
  }
}

export { setToken, fetchToken };

export default userReducer;

