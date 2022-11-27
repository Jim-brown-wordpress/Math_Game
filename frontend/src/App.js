import Register from "./components/auth/Register";
import ParticleComponent from "./components/Particles";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import MyPage from "./components/mypage";
import React from "react";
import Login from "./components/auth/Login";
import ReadyRoom from "./components/Game/ReadyRoom";
import StartRoom from "./components/Game/StartRoom";

import {enteredReadyRoom , wrong , right , readyToStart , outRoom} from './store/actions/gameAction';
import socket from './api';
import {store} from './store/store';
import jwt_decode from 'jwt-decode';
import { SETAUTH } from "./store/actions/type";
import Result from "./components/Result";

// socket.on('enteredReadyRoom' , data => {

// });
// socket.on('readyToStart' , data => {

// });
// socket.on('out' , data => {

// });
// socket.on('wrong' , data => {

// });
// socket.on('right' , data => {

// });

if(localStorage.getItem('token')){
  const payload = jwt_decode(localStorage.getItem('token'));
  // console.log(payload , Date.now());
  if(payload.exp * 1000 < Date.now()){
    localStorage.removeItem('token');
    store.dispatch({type:SETAUTH,payload:{} });
    window.location.href = '/login';
  }
  else{

    store.dispatch({type:SETAUTH,payload });
  }
}


export default function App() {

  return (
    <Router>
      <Routes >
        <Route path="/register" element = {<><ParticleComponent /><Register /></>} />
        <Route path="/login" element = {<><ParticleComponent /><Login /></>} />
        <Route path="/mypage" element = {<MyPage />} />
        <Route path="/ready/:level" element = {<ReadyRoom />} />
        <Route path ='/start/:level' element = {<StartRoom />} />
        <Route path ='/result/:level' element = {<Result />} />
      </Routes>
    </Router>
  );
}
