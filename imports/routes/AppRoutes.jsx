import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useNavigate, useRouteError } from 'react-router-dom';

import { ListTasks } from '../modules/tasks/ListTasks';
import { AuthPage } from '../modules/auth/AuthPage';
import { DashboardPage } from '../modules/dashboard/DashboardPage';
import { NewTask } from '../modules/tasks/pages/newTask';
import { useAuth } from '../ui/context/AuthContext';
import { TasksCollection } from '../api/tasks/tasksCollection';
import { ErrorPage } from '../ui/ErrorPage';
import { NotFoundPage } from '../ui/NotFoundPage';
import { PrivateRoute } from './PrivateRoute';
import { ProfilePage } from '../modules/profile/ProfilePage';




export const PublicRoute = ({ redirectTo = "/dashboard" }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <p>Loading...</p>;

    if (user) return <Navigate to={redirectTo} replace />;

    return <Outlet />;
};

export const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            { path: "/", element: <AuthPage />, errorElement: <ErrorPage /> },
        ],
        errorElement: <NotFoundPage />,
    },
    {
        element: <PrivateRoute redirectTo="/dashboard" />,
        children: [
            { path: "/dashboard", element: <DashboardPage />, errorElement: <ErrorPage /> },
            { path: "/tasks", element: <ListTasks />, errorElement: <ErrorPage /> },
            { path: "/tasks/new", element: <NewTask />, errorElement: <ErrorPage /> },
            {
                path: "/profile", loader: async () => {
                    const profile = await Meteor.callAsync('profiles.get');
                    if (!profile) return {}
                    return profile;
                }, element: <ProfilePage />, errorElement: <ErrorPage />
            },
            {
                path: "/tasks/edit/:id",
                element: <NewTask />,
                loader: async ({ params }) => {
                    const task = TasksCollection.findOne({ _id: params.id });
                    if (!task) throw new Response("Task not found", { status: 404 });
                    return task;
                },
                errorElement: <ErrorPage />,
            },
        ],
        errorElement: <NotFoundPage />,
    },
]);



export const AppRoutes = () => {
    return <RouterProvider router={router} />;
};



/// move on loaders to outher file



