import { getCustomRepository, Repository } from "typeorm"
import { Connection } from "../entities/Connection"
import { ConnectionsRepository } from "../repositories/ConnectionsRepository"

interface IConnectionsCreate {
    socket_id: string
    user_id: string
    admin_id?: string
    id?: string
}

class ConnectionsService {
    private connectionsRepository: Repository<Connection>

    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository)
    }

    async create({ socket_id, user_id, admin_id, id }: IConnectionsCreate) {
        const connection = this.connectionsRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        })

        return await this.connectionsRepository.save(connection)
    }

    async findByUserId(user_id: string) {
        const connection = await this.connectionsRepository.findOne({
            user_id
        })

        return connection
    }

    async listUsersConnections() {
        const connections = await this.connectionsRepository.find({
            where: { admin_id: null },
            relations: ["user"]
        })

        return connections
    }
    
    async findBySocketId(socket_id: string) {
        const connection = await this.connectionsRepository.findOne({
            where: { socket_id },
            relations: ["user"]
        })
        return connection
    }

    async updateAdminId(user_id: string, admin_id: string) {
        await this.connectionsRepository.createQueryBuilder()
            .update(Connection)
            .set({ admin_id })
            .where("user_id = :user_id", {
                user_id
            })
            .execute()
    }
}

export { ConnectionsService }