import { Project } from './project';

export const testProject: () => Project = () => ({
  id: 'id0',
  name: 'name0',
  applicationId: 'gatling',
  createDate: 42,
  updateDate: 1337,
});

export const testProjects: () => Project[] = () => [
  testProject(),
  {
    id: 'id1',
    name: 'name1',
    applicationId: 'gatling',
    createDate: 42,
    updateDate: 1337,
  },
];
