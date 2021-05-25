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
    const clientId = client.conn.request?.['_query']?.clientId;

    console.log('## request ##', client.conn.request);
    console.log('## connected client ##', clientId);
    console.log('## args ##', args);

    this.clients.set(client.id, clientId);
  }

  public handleDisconnect(client: any): any {
    this.clients.delete(client.id);
  }

  public dispatchMessage(message: string): void {

    this.clients.forEach((accId, clientId) => {

      this.server.clients().connected[clientId]?.emit(eventType, message);
      // if (accId === clientId) {
      //   this.server.clients().connected[clientId]?.emit(eventType, message);
      // }
    });

  }

}
