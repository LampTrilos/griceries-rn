import { createSlice } from '@reduxjs/toolkit'

export const groceryListSlice = createSlice({
    name: 'groceryList',
    initialState: {
        value: [
            {id: '1', title:  '...'},
            {id: '2', title:  '....'},
            {id: '3', title:  '.....'  },
            {id: '4', title:  '......'  },
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
            //console.log(action.payload)
            state.value.push(action.payload)
        },
        editItem: (state, action) => {
            //console.log('store')
            //console.log(state.value)
            //console.log(action.payload)
            //Replace an element of a js array with another based on the id
            state.value =  state.value.map(item => action.payload.id === item.id ? action.payload : item);
            //console.log(state.value)
        },
        removeItem: (state, action) => {
            //console.log('Payload is ' + action.payload.id)
            // @ts-ignore
            state.value = state.value.filter(item => item.id !== action.payload.id)
            //console.log(state.value)
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
export const { addItem, editItem,  removeItem, setItems } = groceryListSlice.actions

export default groceryListSlice.reducer
