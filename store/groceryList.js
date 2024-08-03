import { createSlice } from '@reduxjs/toolkit'

export const groceryListSlice = createSlice({
    name: 'groceryList',
    initialState: {
        value: [
            {id: '1', title:  'Μαρόυλια'},
            {id: '2', title:  'Ντομάτες'},
            {id: '3', title:  'Κιμάς'  },
            {id: '4', title:  'Κανελλόνια'  },
        ],
    },
    reducers: {
        addItem: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            // @ts-ignore
            state.value.push(action.payload)
        },
        removeItem: (state, action) => {
            // @ts-ignore
            state.value.filter(item => item.id !== action.payload.id)
        },
        setItems:(state, action) => {
            state.value = action.payload
        }
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, setItems } = groceryListSlice.actions

export default groceryListSlice.reducer