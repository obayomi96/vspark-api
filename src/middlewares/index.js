import authenticate from './authenticate';
import { multerUploads } from './multer';

const { verifyToken, isAdmin, isNgo, isVerified, isVolunteer, verifyNgo, verifyVolunteer } = authenticate;



export default { verifyToken, isAdmin, isNgo, isVerified, isVolunteer, verifyNgo, verifyVolunteer, multerUploads };
