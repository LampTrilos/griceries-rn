import { createSlice } from '@reduxjs/toolkit'
import {axiosGet, axiosPost, axiosPut, axiosDelete} from "@/hooks/axiosCall";

export const groceryListSlice = createSlice({
    name: 'groceryList',
    initialState: {
        value: [],
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
            state.value = reOrderList(state.value)
            axiosPost('groceryList', action.payload)
        },
        editItem: (state, action) => {
            //console.log('store')
            //console.log(state.value)
            //console.log(action.payload)
            //Replace an element of a js array with another based on the id
            state.value =  state.value.map(item => action.payload.id === item.id ? action.payload : item);
            //console.log(state.value)
            state.value = reOrderList(state.value)
            axiosPut('groceryList', action.payload)
        },
        removeItem: (state, action) => {
            //console.log('Payload is ' + action.payload.id)
            // @ts-ignore
            state.value = state.value.filter(item => item.id !== action.payload.id)
            //console.log(state.value)
            state.value = reOrderList(state.value)
            axiosDelete('groceryList', action.payload.id)
        },
        setItems:(state, action) => {
            state.value = [action.payload]
            state.value = reOrderList(state.value)
            //console.log(state.value)
        }
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
    },
})

//This function  rearranges the list  every time a change occurs, constant items come on top
function reOrderList(itemList) {
    let tempList =  [...itemList].sort((a, b) => {
        if (a.constant !== b.constant) {
            return a.constant ? 1 : -1;
        }
        if (a.discount !== b.discount) {
            return b.discount ? 1 : -1;
        }
        return 0;
    });
    return tempList[0];
}



// Action creators are generated for each case reducer function
export const { addItem, editItem,  removeItem, setItems } = groceryListSlice.actions

export default groceryListSlice.reducer
