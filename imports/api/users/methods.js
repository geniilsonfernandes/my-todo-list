import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'users.create'(email, password) {
    if (!email || !password) {
      throw new Meteor.Error('invalid-data', 'Email e senha são obrigatórios');
    }

    const userId = Accounts.createUser({
      email,
      password,
    });

    return userId;
  }
});