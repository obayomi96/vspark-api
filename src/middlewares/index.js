import authenticate from './authenticate';

const { verifyToken, isAdmin } = authenticate;

export default { verifyToken, isAdmin };
