import React from "react";
import { Meteor } from "meteor/meteor";
import { toast } from "sonner";

const AuthContext = React.createContext();

const KEY = "user";
const PROFILE_KEY = "profile";

export const AuthProvider = ({ children }) => {
    const [profile, setProfile] = React.useState(() => {
        const savedProfile = localStorage.getItem(PROFILE_KEY);
        return savedProfile ? JSON.parse(savedProfile) : null;
    });

    const [user, setUser] = React.useState(() => {
        const savedUser = localStorage.getItem(KEY);
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const logout = () => {
        Meteor.logout();
        setUser(null);
        localStorage.removeItem(KEY);
        setProfile(null);
        localStorage.removeItem(PROFILE_KEY);
    };


    const saveProfileLocal = (profileData) => {
        setProfile(profileData);
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profileData));
    };


    const fetchProfile = async () => {
        Meteor.callAsync('profiles.get').then((profile) => {
            saveProfileLocal(profile);
        });
    };

    const login = async (email, password) => {
        try {
            const result = await new Promise((resolve, reject) => {
                Meteor.loginWithPassword(email, password, (err) => {
                    if (err) reject(err);
                    else resolve(Meteor.user());
                });
            });

            setUser(result);
            localStorage.setItem(KEY, JSON.stringify(result));
            fetchProfile();

            toast.success('Logado com sucesso!');
        } catch (err) {
            toast.error('Erro ao logar', { description: "Por favor, verifique suas credenciais" });
        }
    };

    const register = async (email, password) => {
        Meteor.callAsync('users.create', email, password).then(() => {
            toast.success('Usuário criado com sucesso!');

        }).catch((err) => {
            toast.error('Erro ao criar usuário', { description: err.reason });
        });
    };


    const saveProfile = async (profileData) => {
        await Meteor.callAsync('profiles.save', profileData).then(() => {
            toast.success('Perfil salvo com sucesso!');
            fetchProfile();
        }).catch((err) => {
            toast.error('Erro ao salvar perfil', { description: err.reason });
        });
    };




    return (
        <AuthContext.Provider value={{ user, logout, login, register, profile, saveProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);