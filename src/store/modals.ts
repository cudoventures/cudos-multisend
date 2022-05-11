import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface modalsState {
    title: string
    message: string
    costOfMultiSendOperation: string
    finalCost: string
    youAreSaving: string
    txHash: string
    loading: boolean
    success: boolean
    failure: boolean
}

const initialState: modalsState = {
    title: '',
    message: '',
    costOfMultiSendOperation: '',
    finalCost: '',
    youAreSaving: '',
    txHash: '',
    loading: false,
    success: false,
    failure: false,
}

export const modalsStateSlice = createSlice({
  name: 'modalsState',
  initialState,
  reducers: {
    updateModalsState: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateModalsState } = modalsStateSlice.actions

export default modalsStateSlice.reducer
