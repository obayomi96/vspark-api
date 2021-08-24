import express from 'express';
import SkillController from '../controllers/SkillController';

const {
 createSkill,
 fetchSkills
} = SkillController;

const skillRoute = express();

skillRoute.post('/', createSkill);
skillRoute.get('/', fetchSkills);

export default skillRoute;
