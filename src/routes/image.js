import express from 'express';
import 'express-async-errors';
import ImageUpload from '../helpers/imageUpload';
import middlewares from '../middlewares';

const router = express.Router();
const { multerUploads, verifyNgo } = middlewares;
const { uploadImage } = ImageUpload;

router.post('/', verifyNgo, multerUploads, uploadImage);

export default router;
