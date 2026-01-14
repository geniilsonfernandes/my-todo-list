import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { TasksCollection } from './tasksCollection';

// Enum de status permitido
export const TaskStatus = ['pending', 'in-progress', 'completed'];

export const TaskStatusEnum = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
};


Meteor.methods({
  async 'tasks.create'(todo, description, status = 'pending', date) {
    check(todo, String);
    check(description, String);
    check(status, Match.Where(s => TaskStatus.includes(s)));
    check(date, Date);

    if (!this.userId) throw new Meteor.Error('not-authorized', 'Você precisa estar logado');

    const user = await Meteor.users.findOneAsync(this.userId);

    return TasksCollection.insertAsync({
      todo,
      description,
      status,
      date,
      owner: this.userId,
      user,
      createdAt: new Date(),
    })
  },



  async 'tasks.update'(taskId, todo, description, status = 'pending', date) {
    check(taskId, String);
    check(todo, String);
    check(description, String);
    check(status, Match.Where(s => TaskStatus.includes(s)));
    check(date, Date);

    const task = await TasksCollection.findOneAsync(taskId);

    if (!task || task.owner !== this.userId)
      throw new Meteor.Error('not-authorized', 'Você não pode editar esta tarefa');

    return TasksCollection.updateAsync(taskId, {
      $set: { todo, description, status, date },
    });
  },

  async 'tasks.updateStatus'(taskId, status) {
    check(taskId, String);
    check(status, Match.Where(s => TaskStatus.includes(s)));

    const task = await TasksCollection.findOneAsync(taskId);
    if (!task || task.owner !== this.userId)
      throw new Meteor.Error('not-authorized', 'Você não pode alterar esta tarefa');

    return TasksCollection.updateAsync(taskId, {
      $set: { status },
    });
  },

  async 'tasks.remove'(taskId) {
    check(taskId, String);

    const task = await TasksCollection.findOneAsync(taskId);
    if (!task || task.owner !== this.userId)
      throw new Meteor.Error('not-authorized', 'Você não pode remover esta tarefa');

    return TasksCollection.removeAsync(taskId);
  },
  async 'tasks.count'({ showCompleted = false } = {}) {

    const selector = {};
    if (!showCompleted) {
      selector.status = { $ne: 'completed' };
    }

    return TasksCollection.find(selector).countAsync();
  },

  /// get one task
  async 'tasks.getOne'(taskId) {
    check(taskId, String);
    const task = await TasksCollection.findOneAsync(taskId);
    if (!task || task.owner !== this.userId)
      throw new Meteor.Error('not-authorized', 'Você não pode visualizar esta tarefa');
    return task;
  },


  // analytics for welcome page
  async 'tasks.analytics'() {
    if (!this.userId) return 0;

    const selector = { owner: this.userId };
    const totalTasks = await TasksCollection.find(selector).countAsync();
    const completedTasks = await TasksCollection.find({ ...selector, status: 'completed' }).countAsync();
    const inProgressTasks = await TasksCollection.find({ ...selector, status: 'in-progress' }).countAsync();
    const pendingTasks = await TasksCollection.find({ ...selector, status: 'pending' }).countAsync();

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
    };
  }
});

