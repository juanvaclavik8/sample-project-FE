import { Component, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // Define helper vars
  title = 'sensx-frontend';
  userInput: string = '';
  start: number = 0;
  timestamp: number = 0;
  status: string = 'idle';
  notification: string = '';
  runsCount: number = 0;
  private hubConnectionBuilder!: HubConnection;

  // Define user form - input and button
  userForm = new FormGroup({
    userInput: new FormControl({
      value: '',
      disabled: true,
    }),
  });

  constructor(private dataService: DataService) {
    console.log('Status: ' + this.status);

    // Ping backend if is ready
    inject(NgZone).runOutsideAngular(() => {
      setTimeout(() => {
        this.PingActive();
      }, 5000); // 5000 milliseconds = 5 seconds
    });
  }

  ngOnInit(): void {
    // Setup SignalR notifications receipt
    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl('https://localhost:7152/Notification')
      .configureLogging(LogLevel.Information)
      .build();
    this.hubConnectionBuilder
      .start()
      .then(() => console.log('SignalR connection established'))
      .catch((err) => console.log('Error with SignalR connection'));

    this.hubConnectionBuilder.on('SendNotificationToUser', (result: any) => {
      if (result == 'finished') {
        this.status = result;
      } else {
        this.notification = result;
        this.runsCount++;
      }
    });
  }

  PingActive() {
    this.dataService.pingActive().subscribe({
      next: (response) => this.IsActive(),
      error: (error) => this.IsNotActive(),
    });
  }

  IsActive() {
    // If BE active, enable input and change icon to online
    this.userForm.enable();
    this.status = 'online';
    console.log('Status: ' + this.status);
  }

  IsNotActive() {
    // If BE NOT active, disable input and change icon to idle
    this.status = 'idle';
    console.log('Status: ' + this.status);
  }

  OnSubmitUserInput(val: string) {
    // Take user input
    this.userInput = val;

    if (typeof this.userInput === 'string' && this.userInput.length === 0) {
      // If empty, no BE call
      console.log('No user input');
    } else {
      // BE call and pass input value
      console.log('User input: ' + this.userInput);
      this.dataService.sendData(this.userInput).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
    }
  }
}
