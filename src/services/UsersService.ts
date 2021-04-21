import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"

interface IUserCreate {
    email: string
}


class UsersService {
    async create({ email }: IUserCreate) {
        // Verificar se o usuário existe

        const usersRepository = getCustomRepository(UsersRepository)

        // Se existir, retornar usuário
        const userExists = await usersRepository.findOne({
            email
        })

        if (userExists) {
            return userExists
        }

        // Se não, salvar no DB
        const user = usersRepository.create({
            email
        })

        return await usersRepository.save(user)
    }
}

export { UsersService }