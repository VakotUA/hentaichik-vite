import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface State {
  value: string[]
}

const initialState: State = { value: [] }

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags(state, action: PayloadAction<string[]>) {
      state.value = action.payload
    },
    addTags(state, action: PayloadAction<string>) {
      state.value.push(action.payload)
    },
    addTag(state, action: PayloadAction<string[]>) {
      state.value.push(...action.payload)
    },
  },
})

export const tagsActions = tagsSlice.actions
export const { setTags, addTag, addTags } = tagsSlice.actions

export default tagsSlice.reducer
