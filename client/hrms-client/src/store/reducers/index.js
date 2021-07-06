import {combineReducers} from "redux"

//reducers
import loggedReducer from "./isLogged"
import favReducer from "./Fav"
import adminReducer from "./Admin"

const allReducers = combineReducers({
      loggedReducer,
      favReducer,
      adminReducer,
})

export default allReducers