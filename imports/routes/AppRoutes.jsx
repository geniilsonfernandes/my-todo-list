import React from 'react';
import { WelcomePage } from '../modules/welcome/welcomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<WelcomePage />} />
        </Routes>
    </Router>
);