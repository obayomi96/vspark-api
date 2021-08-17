import express from 'express';
import userRoute from './user';
import ngoRoute from './ngo';
import volunteerRoute from './volunteer';

const router = express();

router.get('/', (req, res) =>
  res.status(200).json({
    status: res.statusCode,
    message: 'Welcome to Volunteerspark API',
  })
);

router.use('/users', userRoute);
router.use('/ngo', ngoRoute);
router.use('/volunteer', volunteerRoute);

export default router;
