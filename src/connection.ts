import {Component} from '@angular/core';
import {StompConfig, StompService} from '@stomp/ng2-stompjs';

export class Connection {
    public stompService: StompService;

    constructor(public wsUrl: string, public wsAuth: string) {
        let stompConfig = new StompConfig();
        stompConfig.url = wsUrl;

        this.stompService = new StompService(stompConfig);
    }
}

@Component({
    templateUrl: './connection.html'
})
export class ConnectionComponent {
    public connection: Connection;
}
