export class ChatMessage{
sender:string | undefined;
receiver:string | undefined;
content:string | undefined;
timestamp:string | undefined;

constructor(sender:string, receiver:string, content:string, timestamp:string){
this.sender = sender;
this.receiver = receiver;
this.content = content;
this.timestamp = timestamp;
}
}