import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './tasksCollection';

Meteor.publish('tasks', function tasksPublication({ limit = 4, skip = 0, query = "", onlyCompleted = false }) {
  if (!this.userId) return this.ready();

  let selector = { owner: this.userId };

  if (onlyCompleted) {
    selector.status = 'completed';
  }

  if (query && query.trim() !== '') {
    selector.todo = { $regex: query.trim(), $options: 'i' };
  }

  return TasksCollection.find(
    selector,
    {
      limit,
      skip,
    }
  );
});