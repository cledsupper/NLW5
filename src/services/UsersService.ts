import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import { UsersRepository } from "../repositories/UsersRepository"

interface IUserCreate {
    email: string
}


class UsersService {
    private usersRepository: Repository<User>

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository)
    }

    async create({ email }: IUserCreate) {
        // Verificar se o usuário existe
        // Se existir, retornar usuário
        const userExists = await this.usersRepository.findOne({
            email
        })

        if (userExists) {
            return userExists
        }

        // Se não, salvar no DB
        const user = this.usersRepository.create({
            email
        })

        return await this.usersRepository.save(user)
    }
}

export { UsersService }