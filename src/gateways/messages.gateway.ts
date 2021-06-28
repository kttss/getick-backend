import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  afterInit(server: Server): void {
    console.log('init');
  }

  handleConnection(client: Socket, ...args: any[]): void {
    client.emit('connected', 'Successfully connected to the server');
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    console.log(`got new event` + text);
    return { event: 'events', data: text };
  }
}
