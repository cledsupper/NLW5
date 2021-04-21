import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repositories/UserRepository"

interface IUserService {
    email: string
}


class UserService {
    async create({ email }: IUserService) {
        // Verificar se o usuário existe

        const userRepository = getCustomRepository(UserRepository)

        // Se existir, retornar usuário
        const userExists = await userRepository.findOne({
            email
        })

        if (userExists) {
            return userExists
        }

        // Se não, salvar no DB
        const user = userRepository.create({
            email
        })

        return await userRepository.save(user)
    }
}

export { UserService }