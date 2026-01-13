import React, { createContext, useContext } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { toast } from 'sonner'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const { user, isLoading } = useTracker(() => ({
        user: Meteor.user(),
        isLoading: Meteor.loggingIn(),
    }));

    const login = (email, password) => {
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                console.log(err);

                toast.error('Erro login:', {
                    description: err.reason,
                });
            } else {
                toast.success('Logado!');
            }
        });
    };

    const logout = () => {
        Meteor.logout();
    };

    return (
        <AuthContext.Provider value={{
            user, isLoading, logout, login,
            userEmail: user?.emails[0].address,

        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
