import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { TodoListPage } from '../modules/todoList/TodoListPage';
import { AuthPage } from '../modules/auth/AuthPage';
import { DashboardPage } from '../modules/dashboard/DashboardPage';
import { EditPage } from '../modules/todoList/EditPage';
import { RouteWrapper } from './RouteWrapper';

export const AppRoutes = () => (
    <Router>
        <Routes>
            <Route
                path="/"
                element={
                    <RouteWrapper type="public">
                        <AuthPage />
                    </RouteWrapper>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <RouteWrapper type="private">
                        <DashboardPage />
                    </RouteWrapper>
                }
            />
            <Route
                path="/tasks"
                element={
                    <RouteWrapper type="private">
                        <TodoListPage />
                    </RouteWrapper>
                }
            />
            <Route
                path="/edit/:id"
                element={
                    <RouteWrapper type="private">
                        <EditPage />
                    </RouteWrapper>
                }
            />
        </Routes>
    </Router>
);