import jwt, { JwtPayload } from "jsonwebtoken"
import env from "../utils/validation"
import { RequestHandler } from "express"

declare module 'express-serve-static-core' {
  interface Request {
    user?: string | JwtPayload;
  }
}

const authenticateJWT:RequestHandler = (req , res , next)=>{
    const token = req.header("Authorization")?.split(' ')[1]

    if(!token) {
        return res.status(403).json({message: "No token provided, authorization denied."})
    }

    try {
        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET ) 
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({message: "Invalid token, authorization denied."})
    }
} 
export default authenticateJWT