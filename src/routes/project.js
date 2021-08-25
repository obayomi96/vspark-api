import express from 'express';
import ProjectController from '../controllers/ProjectController';
import middlewares from '../middlewares';

const {
 createProject,
 fetchProject,
 updateProject,
 fetchProjects
} = ProjectController;

const {
  verifyNgo
} = middlewares;

const projectRoute = express();

projectRoute.post('/', verifyNgo, createProject);
projectRoute.get('/', fetchProjects);
projectRoute.get('/:project_id', fetchProject);
projectRoute.patch('/:project_id', verifyNgo, updateProject);

export default projectRoute;
