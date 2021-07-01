import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import {createStore} from 'redux'
import {Provider} from "react-redux"
import allReducers from "./store/reducers"

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';

const store = createStore(allReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(<Router><Provider store={store}><App /></Provider></Router>,document.getElementById('root'));