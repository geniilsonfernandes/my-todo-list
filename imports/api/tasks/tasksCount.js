import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './tasksCollection';
import { Counts } from 'meteor/tmeasday:publish-counts';



// contador total
Meteor.publish('tasksCount', function () {
  if (!this.userId) return this.ready();

  Counts.publish(
    this,
    'tasksCount',
    TasksCollection.find(),
    { noReady: true }
  );
});