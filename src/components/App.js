import React, { Component, useState } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route";
import RuleList from "./RuleList";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TweetFeed from "./TweetFeed";
import Home from "./pages/Home";
import Twitter from "./pages/Twitter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import './App.css'

// import { AuthProvider } from '../reducers/contexts';
import TwitterAuth from "./pages/TwitterAuth";

export default function App() {

    return (
      <div className="ui container">
        <div className="introduciton"></div>
        <div className="ui container">
            <Navbar />
            <Route exact path="/" component={Home} />
            <ProtectedRoute exact path="/twitter" component={Twitter} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={Signup} />
            <AuthRoute exact path="/auth" component={TwitterAuth} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <Footer />
        </div>
      </div>
    );
}