import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './tasksCollection';




Meteor.publish('tasks', function tasksPublication({ limit = 4, skip = 0, query = "", showCompleted = false }) {
  if (!this.userId) return this.ready();

  let selector = { owner: this.userId };


  if (!showCompleted) {
    selector.status = { $ne: 'completed' };
  }


  if (query && query.trim() !== '') {
    selector.todo = { $regex: query.trim(), $options: 'i' };
  }
  const result = TasksCollection.find(
    selector,
    {
      sort: { createdAt: -1 },
      skip,
      limit,
    }
  );


  return result
});