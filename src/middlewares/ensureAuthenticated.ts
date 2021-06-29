import {Request,Response,NextFunction} from "express"
import {verify} from "jsonwebtoken"

interface IPayload{
    sub:string
}

export function esnureAuthenticated(request:Request, response:Response,next:NextFunction){
    const authtoken = request.headers.authorization

    if(!authtoken) {
        return response.status(401).end()
    }

    const [,token] = authtoken.split(" ")
    try{    
    const {sub} =verify(token,"8f2411c0d20c6a033f662dbb85d9417d") as IPayload
    request.user_id = sub
    return next()

      
    }catch(err){
        return response.status(401).end()

    }
}
