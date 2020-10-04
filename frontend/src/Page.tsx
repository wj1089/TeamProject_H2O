import React from "react";
import {Switch, Route } from "react-router-dom";
import {NavBar, Footer} from './layout'
import {MainTopPage, MainBottomPage} from './pages/splash-page'
import {SearchHospital} from './pages/SearchHospital'
import {Ambulance} from './pages/Ambulance'
import {TeleMedicine, RtcRoom} from './pages/TeleMedicine'
import {Community, Edit} from './pages/Community'
import {Login, SignUp, MyPage, UserModify, UserFindID, UserFindPW, UserDelete, } from './pages/Account'
import './pages/Community/community.css'
import { Reservation, TelReservation } from "./pages/Reservation";
import CarReservation from "./pages/Reservation/CarReservation";

const Page = () => (

    <Switch>
            <Route path="/" exact>
                    <MainTopPage/>
                    <MainBottomPage/>
                    <Footer/>
            </Route>

            
            <Route path="/Reservation/:hospitalName/:name/:medicalSubject">
                    <NavBar/>
                    <Route path={`/Reservation/:hospitalName/:name/:medicalSubject`}
                       render = {(props) => <Reservation {...props}/>}>
                    </Route>
                    <Footer/>
            </Route>
            <Route path="/TelReservation/:hospitalName/:name/:medicalSubject">
                    <NavBar/>
                    <Route path={`/TelReservation/:hospitalName/:name/:medicalSubject`}
                       render = {(props) => <TelReservation {...props}/>}>
                    </Route>

                    <Footer/>
            </Route>
            <Route path="/CarReservation/:content/:name/:startAddr/:endAddr/:postcode">
                <NavBar/>
                <Route path={`/CarReservation/:content/:name/:startAddr/:endAddr/:postcode`}
                       render = {(props) => <CarReservation {...props}/>}>
                </Route>
                <Footer/>
            </Route>


            <Route path="/Ambulance">
                    <NavBar/>
                    <Ambulance/>
                    <Footer/>
            </Route>

            <Route path="/Edit">
                    <NavBar/>
                    <Edit/>
                    <Footer/>
            </Route>

            <Route path="/Community">
                    <NavBar/>
                    <Community/>
                    <Footer/>
            </Route>

            <Route path="/SearchHospital">
                    <NavBar/>
                    <SearchHospital/>
                    <Footer/>
            </Route>

            <Route path="/Login">
                    <NavBar/>
                    <Login/>
                    <Footer/>
            </Route>

            <Route path="/MyPage">
                    <NavBar/>
                    <MyPage/>
                    <Footer/>
            </Route>

            <Route path="/UserModify">
                    <NavBar/>
                    <UserModify/>
                    <Footer/>
            </Route>

            <Route path="/UserFIndID">
                    <NavBar/>
                    <UserFindID/>
                    <Footer/>
            </Route>

            <Route path="/UserFIndPW">
                    <NavBar/>
                    <UserFindPW/>
                    <Footer/>
            </Route>

            <Route path="/UserDelete">
                    <NavBar/>
                    <UserDelete/>
                    <Footer/>
            </Route>

            <Route path="/SignUp">
                    <NavBar/>
                    <SignUp/>
                    <Footer/>
            </Route>
                  
            <React.Fragment>
                    <Route path="/TeleMedicine" exact component={RtcRoom}/>
                    <Route path="/TeleMedicine/:roomId" exact component={TeleMedicine}/>
            </React.Fragment>

    </Switch>
);

export default Page;