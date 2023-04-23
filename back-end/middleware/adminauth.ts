
import jwt from "jsonwebtoken";
require('dotenv').config()


export const verifyToken = (req:any, res:any, next:any) => {
    const token = req.headers.authorization;
        
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    let secret_key:any = process.env.ACCES_SECRET_TOKEN;
    jwt.verify(token.split(' ')[1], secret_key, (err:any, decoded:any) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
}






