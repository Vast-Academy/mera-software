// store/userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  walletBalance: 0
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload
      state.walletBalance = action.payload?.walletBalance || 0
    },
    updateWalletBalance: (state, action) => {
      state.walletBalance = action.payload
    }
  }
})

export const { setUserDetails, updateWalletBalance } = userSlice.actions
export default userSlice.reducer