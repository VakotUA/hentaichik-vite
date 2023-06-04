import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface State {
  value: number[]
}

const initialState: State = { value: [] }

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<number>) {
      state.value.push(action.payload)
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.value = state.value.filter((favorite) => favorite !== action.payload)
    },
  },
})

export const favoriteActions = favoriteSlice.actions
export const { addFavorite, removeFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer
