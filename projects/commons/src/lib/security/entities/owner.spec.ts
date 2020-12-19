import { Owner } from './owner';

export const testPublicOwner: () => Owner = () => new Owner();

export const testUserOwner: () => Owner = () => new Owner('userId', 'projectId', 'gatling', 'USER');

export const testApplicationOwner: () => Owner = () => new Owner('', '', 'gatling', 'APPLICATION');
