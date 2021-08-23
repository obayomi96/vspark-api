import authenticate from './authenticate';

const { verifyToken, isAdmin, isNgo, isVerified, isVolunteer } = authenticate;

export default { verifyToken, isAdmin, isNgo, isVerified, isVolunteer };
