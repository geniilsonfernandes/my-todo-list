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
  'tasks.create'(todo, description, status = 'pending', date) {
    check(todo, String);
    check(description, String);
    check(status, Match.Where(s => TaskStatus.includes(s)));
    check(date, Date);


    if (!this.userId) throw new Meteor.Error('not-authorized', 'Você precisa estar logado');

    const user = Meteor.user();
    console.log(user);
    

    return TasksCollection.insertAsync({
      todo,
      description,
      status,
      date,
      owner: this.userId,
      createdAt: new Date(),
    })
  },

  

  'tasks.update'(taskId, todo, description, date) {
    check(taskId, String);
    check(todo, String);
    check(description, String);
    check(date, Date);

    const task = TasksCollection.findOne(taskId);
    if (!task || task.owner !== this.userId)
      throw new Meteor.Error('not-authorized', 'Você não pode editar esta tarefa');

    return TasksCollection.update(taskId, {
      $set: { todo, description, date },
    });
  },

  'tasks.updateStatus'(taskId, status) {
    check(taskId, String);
    check(status, Match.Where(s => TaskStatus.includes(s)));

    const task = TasksCollection.findOne(taskId);
    if (!task || task.owner !== this.userId)
      throw new Meteor.Error('not-authorized', 'Você não pode alterar esta tarefa');

    return TasksCollection.update(taskId, {
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
  async 'tasks.count'() {
    if (!this.userId) return 0;
    return TasksCollection.find({ owner: this.userId }).countAsync();
  },

  /// get one task
  async 'tasks.getOne'(taskId) {
    check(taskId, String);
    const task = await TasksCollection.findOneAsync(taskId);
    if (!task || task.owner !== this.userId)
      throw new Meteor.Error('not-authorized', 'Você não pode visualizar esta tarefa');
    return task;
  },
});

