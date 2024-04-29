import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from '../model/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url = "http://localhost:5500/chat/message";
  constructor(private httpClient: HttpClient) { }

  publishChatMessage(chatMessage: ChatMessage): any{
    this.httpClient.post<ChatMessage>(this.url, chatMessage).subscribe(
      response => {
        // Handle response from the API if needed

        console.log(response);
      },
      error => {
        // Handle error from the API if needed
        console.error('Error adding product:', error);
      }
    );
  };
}
