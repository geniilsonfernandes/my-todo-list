import React from "react";
import { Meteor } from "meteor/meteor";
import { toast } from "sonner";

const AuthContext = React.createContext();

const KEY = "user";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(() => {
        const savedUser = localStorage.getItem(KEY);
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const logout = () => {
        Meteor.logout();
        setUser(null);
        localStorage.removeItem(KEY);
    };

    const setUserDataInLocalStorage = (userData) => {
        setUser(userData);
        localStorage.setItem(KEY, JSON.stringify(userData));
    };



    const login = async (email, password) => {
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                toast.error('Erro login', { description: err.reason });
            } else {
                toast.success('Logado com sucesso!');
                setUserDataInLocalStorage(Meteor.user());
            }

        });
    };

    const register = async (email, password) => {
        Meteor.call('users.create', email, password, (err, result) => {
            if (err) {
                toast.error('Erro ao criar usuário', { description: err.reason });
            } else {
                toast.success('Usuário criado com sucesso!');
                setUserDataInLocalStorage(Meteor.user());
            }
        });
    };




    return (
        <AuthContext.Provider value={{ user, logout, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);