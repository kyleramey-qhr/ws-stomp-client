import {Component} from '@angular/core';
import {ConnectionService} from './connection.service';

@Component({
    selector: 'connect',
    templateUrl: './connect.html'
})
export class ConnectComponent {

    constructor(private connectionService: ConnectionService) {
    }

    connectStomp(url: string, authHeader: string) {
        console.log('Connect');

        this.connectionService.connect(url, authHeader);
    }
}