import express from 'express';
import userRoute from './user';
import ngoRoute from './ngo';
import volunteerRoute from './volunteer';
import projectRoute from './project';
import opportunityRoute from './opportunity';

const router = express();

router.get('/', (req, res) =>
  res.status(200).json({
    status: res.statusCode,
    message: 'Welcome to Volunteerspark API',
  })
);

router.use('/user', userRoute);
router.use('/ngo', ngoRoute);
router.use('/volunteer', volunteerRoute);
router.use('/project', projectRoute);
router.use('/opportunity', opportunityRoute);

export default router;
