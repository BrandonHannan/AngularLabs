import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat implements OnInit{
  public messages: any[] = [];
  newMessage = {
    text: ''
  };
  ioConnection: any;

  constructor(private socket: SocketService) {}

  ngOnInit(): void {
    this.socket.initialiseSocket();
    this.ioConnection = this.socket.getMessage().subscribe((message: any) => {
      if (message.senderId == this.socket.clientId){
        message.isOwnMessage = true;
      }
      else{
        message.isOwnMessage = false;
      }
      this.messages.push(message);
    });
  }

  public sendMessage() {
    if (!this.newMessage.text) return;

    this.socket.sendMessage(this.newMessage);

    this.newMessage.text = '';
  }
}
