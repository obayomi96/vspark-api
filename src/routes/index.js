import express from 'express';
// import userRoute from './user';

const router = express();

router.get('/', (req, res) =>
  res.status(200).json({
    status: res.statusCode,
    message: 'Welcome to Volunteerspark API',
  })
);

// router.use('/users', userRoute);

export default router;
