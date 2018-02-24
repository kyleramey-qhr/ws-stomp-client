import {Component} from '@angular/core';
import {ConnectionService} from './connection.service';

@Component({
    selector: 'manage',
    templateUrl: './manage.html'
})
export class ManageComponent {

    constructor(private connectionService: ConnectionService) {
    }

    send(path: string, body: string) {
        this.connectionService.sendMessage(path, body);
    }

    subscribe(path: string) {
        this.connectionService.subscribe(path);
    }

}