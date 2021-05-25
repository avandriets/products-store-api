import { Injectable } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Injectable()
export class EventsService {

  constructor(private readonly serverGateWay: EventsGateway) {
  }

  public dispatch(message: string): void {
    this.serverGateWay.dispatchMessage(message);
  }

}
