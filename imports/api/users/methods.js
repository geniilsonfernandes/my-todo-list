import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import bcrypt from 'bcrypt';

Meteor.methods({
  'users.create'(email, password) {
    if (!email || !password) {
      throw new Meteor.Error('invalid-data', 'Email e senha são obrigatórios');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userId = Accounts.createUser({
      email,
      password: password,
    });

    return userId;
  }
});