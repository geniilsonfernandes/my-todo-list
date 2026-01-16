import { Meteor } from "meteor/meteor";
import { Tracker } from 'meteor/tracker';
import React from "react";
import { toast } from "sonner";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = React.useState(Meteor.userId());
    const [user, setUser] = React.useState(Meteor.user());

    React.useEffect(() => {
        const tracker = Tracker.autorun(() => {
            setUserId(Meteor.userId());
            setUser(Meteor.user());
        });

        return () => tracker.stop();
    }, []);

    const logout = () => {
        Meteor.logout();
        setUser(null);
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
        }).catch((err) => {
            toast.error('Erro ao salvar perfil', { description: err.reason });
        });
    };



    return (
        <AuthContext.Provider value={{ user, logout, login, register, saveProfile, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);