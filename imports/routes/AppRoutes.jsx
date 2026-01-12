import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoListPage } from '../modules/todoList/TodoListPage';
import { AuthPage } from '../modules/auth/AuthPage';
import { DashboardPage } from '../modules/dashboard/DashboardPage';

export const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/tasks" element={<TodoListPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
    </Router>
);