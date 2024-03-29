import { io } from "../http"
import { ConnectionsService } from "../services/ConnectionsService"
import { UsersService } from "../services/UsersService"
import { MessagesService } from "../services/MessagesService"

interface IParams {
    text: string
    email: string
}

io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService()
    const usersService = new UsersService()
    const messagesService = new MessagesService()

    socket.on("client_first_access", async (params) => {
        const socket_id = socket.id
        const { text, email } = params as IParams

        const user = await usersService.create({email})

        // Salvar conexão com o socket_id, user_id
        const connection = await connectionsService.findByUserId(user.id)
        if (!connection) {
            await connectionsService.create({
                socket_id,
                user_id: user.id
            })
        }
        else {
            connection.socket_id = socket_id
            await connectionsService.create(connection)
            // O cliente está solicitando um novo atendimento
            await connectionsService.updateAdminId(user.id, null)
        }

        await messagesService.create({
            text,
            user_id: user.id
        })

        const allMessages = await messagesService.listByUser(user.id)

        socket.emit("client_list_all_messages", allMessages)
        
        const usersConnections = await connectionsService.listUsersConnections()
        io.emit("admin_list_all_users", usersConnections)
    })
    
    socket.on("client_send", async (params) => {
        const { text, socket_admin_id } = params
        const connection = await connectionsService.findBySocketId(socket.id)
        const { user_id } = connection
        
        const message = await messagesService.create({
            text,
            user_id
        })
        
        io.to(socket_admin_id).emit("client_sent", {
            message,
            connection
        })
    })
})