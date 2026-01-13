import { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { toast } from 'sonner';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = (email, password) => {
    setLoading(true);
    Meteor.loginWithPassword(email, password, (err) => {
      setLoading(false);
      if (err) {
        toast.error('Erro login', { description: err.reason });
      } else {
        toast.success('Logado com sucesso!');
      }

    });
  };

  const register = (email, password) => {
    setLoading(true);
    Meteor.call('users.create', email, password, (err, result) => {
      setLoading(false);
      if (err) {
        toast.error('Erro ao criar usuário', { description: err.reason });
      } else {
        toast.success('Usuário criado com sucesso!');
      }
    });
  };

  return { login, register, loading };
};