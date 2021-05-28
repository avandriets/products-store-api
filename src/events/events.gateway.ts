import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';

const eventType = 'serverEvent';

@WebSocketGateway()
export class EventsGateway {

  @WebSocketServer() server: Server;

  private clients: Map<string, string> = new Map();

  public handleConnection(client: Client, ...args: any[]): any {
    const user = client.conn.request?.['_query']?.user;

    console.log('## connected client ##', user, client.id);

    this.clients.set(client.id, user);
  }

  public handleDisconnect(client: any): any {
    console.log('## DISCONNECT ##', client.id);
    this.clients.delete(client.id);
  }

  public dispatchMessage(message: any): void {

    this.clients.forEach((accId, clientId) => {

      this.server.clients().connected[clientId]?.emit(eventType, message);
      // if (accId === clientId) {
      //   this.server.clients().connected[clientId]?.emit(eventType, message);
      // }
    });

  }

}
