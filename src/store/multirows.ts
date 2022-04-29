import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface multiRowsState {
  multisendRows: Array<{}>
}

const initialState: multiRowsState = {
  multisendRows: []
}

export const multiRowsSlice = createSlice({
  name: 'multirows',
  initialState,
  reducers: {
    updatemultiRows: (state, action: PayloadAction<multiRowsState>) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updatemultiRows } = multiRowsSlice.actions

export default multiRowsSlice.reducer
