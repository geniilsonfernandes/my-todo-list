import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoListPage } from '../modules/todoList/TodoListPage';
import { AuthPage } from '../modules/auth/AuthPage';


export const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/dashboard" element={<TodoListPage />} />
        </Routes>
    </Router>
);