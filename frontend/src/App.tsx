import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "tailwindcss/dist/base.css";
import "./helpers/styles/globalStyles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css"; 
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import {loginReducer} from './pages/Account'
import {reservationReducer} from './layout/Payment/index'
import Page from './Page';
import AdminPage from './AdminPage';
import Payment from './layout/Payment';
import PaymentResult from './layout/PaymentResult';

//rootReducer

const rootReducer = combineReducers({
  loginReducer,reservationReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk))
const App = () => (
    <BrowserRouter>
    <Provider store={store}>
      <Page />
      <AdminPage/>
    <Route exact path="/payment" component={Payment} />
    <Route exact path="/payment/result" component={PaymentResult} />
    </Provider>
    </BrowserRouter>
);

export default App;
