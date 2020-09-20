import React from 'react';

import './App.css';
import { BrowserRouter as Router ,Route} from "react-router-dom";

import Register from "./components/register" 
import login from "./components/login" 

import home from "./components/home" 

import edit from "./components/edit" 

import Delete from "./components/delete" 

import Reply from "./components/reply.js"



function App() {
  return (
    <Router>

   

      <Route path="/" component={Register} exact />
      <Route path="/login" component={login} exact />
      <Route path="/home" component={home} exact />
      <Route path="/edit/" component={edit} exact />

      <Route path="/delete" component={Delete} exact />

      <Route path="/reply" component={Reply} exact />





      

     


    </Router>
  );
}

export default App;
