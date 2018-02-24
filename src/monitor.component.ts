import {Component} from '@angular/core';
import {ConnectionService} from './connection.service';

@Component({
    selector: 'monitor',
    templateUrl: './monitor.html'
})
export class MonitorComponent {

    constructor(private connectionService: ConnectionService) {
    }

}