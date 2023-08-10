import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server } from 'socket.io';
import { OnGatewayConnection, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  async handleConnection(client: Socket) {
    const messageAtInitial = await this.messagesService.findAll();
    client.emit('allMessages', messageAtInitial);
  }

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = this.messagesService.create(createMessageDto);

    this.server.emit('newMessage', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll(): CreateMessageDto[] {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom() {

  }

  @SubscribeMessage('typing')
  typing() {}
}
