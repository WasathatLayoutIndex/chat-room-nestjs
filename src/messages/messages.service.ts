import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: 'Wasath', text: 'Hello world!' }];

  create(createMessageDto: CreateMessageDto):Message {
    const message = { ...createMessageDto }; 
    this.messages.push(message);
    return message;
  }

  findAll(): Message[] {
    return this.messages;
  }
}
