import { ReactiveVar } from 'meteor/reactive-var';

export const showCompletedVar = new ReactiveVar(false);

export const searchQueryVar = new ReactiveVar('');

export const currentPageVar = new ReactiveVar(0);
