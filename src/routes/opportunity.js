import express from 'express';
import OpportunityController from '../controllers/OpportunityController';
import middlewares from '../middlewares';

const {
 createOpportunity,
 fetchOpportunity,
 updateOpportunity
} = OpportunityController;

const {
  verifyNgo,
} = middlewares;

const opportunityRoute = express();

opportunityRoute.post('/', verifyNgo, createOpportunity);
opportunityRoute.get('/:opportunity_id', verifyNgo, fetchOpportunity);
opportunityRoute.patch('/:opportunity_id', verifyNgo, updateOpportunity);

export default opportunityRoute;
