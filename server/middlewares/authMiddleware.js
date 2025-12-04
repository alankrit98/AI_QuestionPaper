import jwt from 'jsonwebtoken';
import AllowedDomainModule from '../models/AllowedDomains.js';
export const authMiddleware = (req, res, next) => {
   const email = req.body.email || req.query.email;
   if (!email) {
       return res.status(400).json({ message: 'Bad Request: Email is required' });
   }
    const domain = email.split('@')[1];
    AllowedDomainModule.findOne({ domain })
        .then((allowedDomain) => {
            if (!allowedDomain) {
                return res.status(403).json({ message: 'Forbidden: Domain not allowed' });
            }
            next();
        })
        .catch((error) => {
            return res.status(500).json({ message: 'Internal Server Error' });
        });
        
};