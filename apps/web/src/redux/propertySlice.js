import { createSlice } from '@reduxjs/toolkit'

const PropertySlice = createSlice({
    name: 'property',
    initialState: {
        value: {}
    },
    reducers: {
        setData: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setData } = PropertySlice.actions
export default PropertySlice.reducer