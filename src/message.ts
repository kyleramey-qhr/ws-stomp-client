

export class RecordedMessage {
    public date: Date;
    constructor(public type: MessageType, public path: string, public body: string) {
        this.date = new Date();
    }

    typeName() {
        return MessageType[this.type];
    }
}

export enum MessageType {
    Connecting,
    Connected,
    Disconnected,
    Recieved,
    Send,
    Error
}