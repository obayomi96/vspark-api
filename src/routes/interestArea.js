import express from 'express';
import InterestAreaController from '../controllers/InterestAreaController';

const {
 createInterestArea,
 fetchInterestArea
} = InterestAreaController;

const interestAreaRoute = express();

interestAreaRoute.post('/', createInterestArea);
interestAreaRoute.get('/', fetchInterestArea);

export default interestAreaRoute;
