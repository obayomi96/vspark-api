import authenticate from './authenticate';

const { verifyToken, isAdmin, isNgo, isVerified, isVolunteer, verifyNgo, verifyVolunteer } = authenticate;

export default { verifyToken, isAdmin, isNgo, isVerified, isVolunteer, verifyNgo, verifyVolunteer };
