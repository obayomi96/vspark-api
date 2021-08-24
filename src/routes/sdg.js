import express from 'express';
import SdgController from '../controllers/SdgController';

const {
 createSdg,
 fetchSdgs,
} = SdgController;

const sdgRoute = express();

sdgRoute.post('/', createSdg);
sdgRoute.get('/', fetchSdgs);

export default sdgRoute;
