import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from '../model/chatMessage';

@Component({
  selector: 'app-chat-app-socket',
  templateUrl: './chat-app-socket.component.html',
  styleUrls: ['./chat-app-socket.component.css'],
})
export class ChatAppSocketComponent implements OnInit {
  chatInput: string="" ;
  name:any;
  constructor(
    private websocketService: WebSocketService,
    private route: ActivatedRoute
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
    this.websocketService.publish({ destination: '/app/chat', body: JSON.stringify(ChatMessage) });
  }
  // Example method to receive data from the server


  subscribeToTopic() {
    this.websocketService.watch('/topic/group').subscribe((message) => {
      // Handle incoming messages here
      const messag = this.arrayBufferToString(message.binaryBody);
      //String.fromCharCode.apply(null, message._binaryBody)
      console.log('Received message:', messag);
    });
  }
  arrayBufferToString(buffer: ArrayBuffer):string {
    const uint8Array = new Uint8Array(buffer);
    const byteArray = Array.from(uint8Array); // Convert Uint8Array to regular array
    return String.fromCharCode.apply(null, byteArray);
  }
}
