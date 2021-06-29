import {getCustomRepository} from "typeorm"
import { UsersRepositories } from "../respositories/UserRepositories"
import {compare} from "bcryptjs"

import {sign} from "jsonwebtoken"

interface IAutenticateRequest{
    email:string
    password:string
}

class AuthenticateUserService{
    async execute({email,password}:IAutenticateRequest){

        const usersRepositories = getCustomRepository(UsersRepositories)

        const user = await usersRepositories.findOne({email})

        if(!user){
            throw new Error("Email")
        }

        const passwordmatch = await compare(password,user.password)

        if (!passwordmatch) {
            throw new Error ("password incorreto")
        }

        const token = sign({
            email:user.email
        },"8f2411c0d20c6a033f662dbb85d9417d",{
            subject:user.id,
            expiresIn:"1d"
        })

        return token
    }
}


export {AuthenticateUserService}