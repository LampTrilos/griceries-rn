import { configureStore } from '@reduxjs/toolkit'
import groceryListReducer from "@/store/groceryList";
import groceryHistReducer from "@/store/groceryHist";

export default configureStore({
     reducer: {
          groceryList: groceryListReducer,
          groceryHist: groceryHistReducer,
     },
})