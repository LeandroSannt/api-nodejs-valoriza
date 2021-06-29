import { getCustomRepository } from "typeorm"
import {UsersRepositories} from "../respositories/UserRepositories"
import {hash} from "bcryptjs"

interface IUserRequest{
    name:string
    email:string
    admin?: boolean
    password:string
}


class CreateUserService{
    async execute({name,email,admin = false,password}:IUserRequest){
        const usersRepository = getCustomRepository(UsersRepositories)

        if(!email){
            throw new Error("Email incorreto")
        }

        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        if(userAlreadyExists){
            throw new Error("usuario ja existe")
        }

        const passwordhash =await hash(password,8)

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordhash,
        })

        await usersRepository.save(user)
        return user

    }
}

export {CreateUserService}