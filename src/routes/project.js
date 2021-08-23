import express from 'express';
import ProjectController from '../controllers/ProjectController';
import middlewares from '../middlewares';

const {
 createProject
} = ProjectController;

const {
  isNgo
} = middlewares;

const projectRoute = express();

projectRoute.post('/', isNgo, createProject);
// projectRoute.get('/:project_id', isNgo, fetchProject);
// projectRoute.patch('/:project_id', isNgo, updateProject);

export default projectRoute;
