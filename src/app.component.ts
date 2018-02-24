///<reference path="../node_modules/@angular/core/src/linker/view_container_ref.d.ts"/>
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {ConnectionService} from './connection.service';
import {ConnectComponent} from './connect.component';
import {MonitorComponent} from './monitor.component';
import {ManageComponent} from './manage.component';



@Component({
    selector: 'App',
    templateUrl: './app.html'
})
export class AppComponent {
    public readonly name = 'electron-forge';
}

@NgModule({
    imports: [BrowserModule],
    providers: [ConnectionService],
    declarations: [AppComponent, ConnectComponent, MonitorComponent, ManageComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}