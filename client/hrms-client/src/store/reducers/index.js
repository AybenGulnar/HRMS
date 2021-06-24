import {combineReducers} from "redux"

//reducers
import loggedReducer from "./isLogged"

const allReducers = combineReducers({
      loggedReducer,
})

export default allReducers