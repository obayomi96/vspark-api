import express from 'express';
import ProjectController from '../controllers/ProjectController';
import middlewares from '../middlewares';

const {
 createProject,
 fetchProject,
 updateProject
} = ProjectController;

const {
  verifyNgo
} = middlewares;

const projectRoute = express();

projectRoute.post('/', verifyNgo, createProject);
projectRoute.get('/:project_id', verifyNgo, fetchProject);
projectRoute.patch('/:project_id', verifyNgo, updateProject);

export default projectRoute;
