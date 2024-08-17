import { configureStore } from '@reduxjs/toolkit'
import groceryListReducer from "@/store/groceryList";
import groceryHistReducer from "@/store/groceryHist";
import recipeListReducer from "@/store/recipeList";

export default configureStore({
     reducer: {
          groceryList: groceryListReducer,
          groceryHist: groceryHistReducer,
          recipeList: recipeListReducer,
     },
})
