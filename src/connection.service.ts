import {Injectable} from '@angular/core';
import {StompConfig, StompService, StompState} from '@stomp/ng2-stompjs';
import * as Stomp from '@stomp/stompjs';
import {RecordedMessage, MessageType} from './message';

@Injectable()
export class ConnectionService {
    private stompService: StompService;
    public connected: boolean;
    public state: string = 'Closed';
    public messages: RecordedMessage[] = [];

    connect(wsUrl: string, wsAuthHeader: string) {
        let config = new StompConfig();
        if (wsAuthHeader == '') {
            config.url = wsUrl;
        } else {
            config.url = wsUrl + '?jwt=' + wsAuthHeader;
        }
        config.heartbeat_in = 30000;
        config.heartbeat_out = 30000;
        config.debug = true;

        this.stompService = new StompService(config);
        this.stompService.state.subscribe(value => {
            this.connected = (value == StompState.CONNECTED);
            switch (value) {
                case StompState.CONNECTED:
                    this.state = 'Connected';
                    this.addSimpleMessage(MessageType.Connected);
                    break;
                case StompState.CLOSED:
                    this.state = 'Closed';
                    this.addSimpleMessage(MessageType.Disconnected);
                    break;
                case StompState.DISCONNECTING:
                    this.state = 'Disconnecting';
                    break;
                case StompState.TRYING:
                    this.state = 'Connecting';
                    this.addSimpleMessage(MessageType.Connecting);
                    break;
            }
            ;
        });
        this.connected = this.stompService.connected();
        this.stompService.errorSubject.subscribe(value => {
            if (typeof value === 'string') {
                this.addSimpleMessage(MessageType.Error);
            } else {
                this.handleStompError(<Stomp.Message>value);
            }
        });

    }

    sendMessage(path: string, body: string) {
        this.addMessage(MessageType.Send, path, body);
        this.stompService.publish(path, body);
    }

    subscribe(path: string) {
        this.stompService.subscribe(path)
            .subscribe(value => {
                this.addMessage(MessageType.Recieved, path, value.body);
            });
    }

    addSimpleMessage(type: MessageType) {
        this.addMessage(type, '', '');
    }

    addMessage(type: MessageType, path: string, message: string) {
        this.messages.push(new RecordedMessage(type, path, message));
    }

    handleStompError(msg: Stomp.Message) {
        this.addMessage(MessageType.Error, '', msg.headers['message']);
        console.log(msg.headers);
    }
}
