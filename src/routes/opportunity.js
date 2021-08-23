import express from 'express';
import OpportunityController from '../controllers/OpportunityController';
import middlewares from '../middlewares';

const {
 createOpportunity
} = OpportunityController;

const {
  isNgo,
} = middlewares;

const opportunityRoute = express();

opportunityRoute.post('/', isNgo, createOpportunity);
// opportunityRoute.get('/:opportunity_id', isNgo, fetchOpportunity);
// opportunityRoute.patch('/:opportunity_id', isNgo, updateOpportunity);

export default opportunityRoute;
