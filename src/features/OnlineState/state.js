import { saveToken } from '@/app/authActions';
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'onlineState',
  initialState: {
    value: 0,
    token: null,
  },
  reducers: {
    ononline:(state)=>{
      state.value = 1;
    },
    onoffline:(state)=>{  
      state.value = 0;
    }, 
    saveToken: (state, action) => {
      state.token = action.payload;
    },

    
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { onoffline,ononline } = counterSlice.actions;

export default counterSlice.reducer;