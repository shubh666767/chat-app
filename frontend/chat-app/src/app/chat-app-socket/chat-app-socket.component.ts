import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from '../model/chatMessage';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat-app-socket',
  templateUrl: './chat-app-socket.component.html',
  styleUrls: ['./chat-app-socket.component.css'],
})
export class ChatAppSocketComponent implements OnInit {
  chatInput: string="" ;
  name:any;
  chatMessage: ChatMessage | undefined;
  chatMessageList : ChatMessage[] = [];
  constructor(
    private websocketService: WebSocketService,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.subscribeToTopic();
    this.route.queryParams.subscribe((params) => {
      this.name = JSON.parse(params['data']);
    });
  }

  // Example method to send data to the server
  sendDataToServer() {
    const chatMessage: ChatMessage = new ChatMessage(this.name, "server", this.chatInput, new Date().toISOString());

    //const message = `Message generated at ${new Date()}`;
    console.log('sjshsh');
    //this.websocketService.publish({ destination: '/app/chat', body: JSON.stringify(ChatMessage) });
    this.chatService.publishChatMessage(chatMessage);
  }
  // Example method to receive data from the server


  subscribeToTopic() {
    this.websocketService.watch('/topic/group').subscribe((message) => {
      // Handle incoming messages here
      const msg = this.arrayBufferToString(message.binaryBody);
      //String.fromCharCode.apply(null, message._binaryBody)
      const jsonChatObject = JSON.parse(msg);

      this.chatMessage = jsonChatObject;
      if(this.chatMessage){
      if(this.name === this.chatMessage.sender){
        this.chatMessage.sender = "you";
      }
      this.chatMessageList.push(this.chatMessage);
      }

      console.log('Received message:', this.chatMessage);


    });
  }
  arrayBufferToString(buffer: ArrayBuffer):string {
    const uint8Array = new Uint8Array(buffer);
    const byteArray = Array.from(uint8Array); // Convert Uint8Array to regular array
    return String.fromCharCode.apply(null, byteArray);
  }
}
