import React from 'react'
import './App.scss';
import {
    BrowserRouter as Router,
  } from "react-router-dom";

import Nav from './view/layout/nav'

import AppRouters from './view/layout/appRoutes'

const App = () => {
    return (
    <Router>
        <Nav />
        <main className="mdc-top-app-bar--fixed-adjust">
            <AppRouters />
        </main>
    </Router>
    )
}

export default App