import express from 'express';
import OpportunityController from '../controllers/OpportunityController';
import middlewares from '../middlewares';

const {
 createOpportunity,
 fetchOpportunity,
 updateOpportunity,
 applyForOpportunity,
 fetchOpportunities
} = OpportunityController;

const {
  verifyNgo,
  verifyVolunteer
} = middlewares;

const opportunityRoute = express();

opportunityRoute.post('/', verifyNgo, createOpportunity);
opportunityRoute.get('/', fetchOpportunities);
opportunityRoute.get('/:opportunity_id', fetchOpportunity);
opportunityRoute.patch('/:opportunity_id', verifyNgo, updateOpportunity);
opportunityRoute.patch('/:opportunity_id/apply', verifyVolunteer, applyForOpportunity);

export default opportunityRoute;
