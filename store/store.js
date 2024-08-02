import { configureStore } from '@reduxjs/toolkit'
import groceryListReducer from "@/store/groceryList";

export default configureStore({
     reducer: {
          groceryList: groceryListReducer,
     },
})