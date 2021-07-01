import {combineReducers} from "redux"

//reducers
import loggedReducer from "./isLogged"
import favReducer from "./Fav"

const allReducers = combineReducers({
      loggedReducer,
      favReducer,
})

export default allReducers