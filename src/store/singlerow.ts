import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface singleRowState {
  tempAddress: string
  tempAmount: string
}

const initialState: singleRowState = {
  tempAddress: '',
  tempAmount: ''
}

export const singleRowSlice = createSlice({
  name: 'singleRow',
  initialState,
  reducers: {
    updateSingleRow: (state, action: PayloadAction<singleRowState>) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateSingleRow } = singleRowSlice.actions

export default singleRowSlice.reducer
