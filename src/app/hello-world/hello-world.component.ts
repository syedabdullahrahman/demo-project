import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  currentTime: string ="";
  randomNumber: number = 0;

  constructor() {

  }

  ngOnInit(): void {
    var today = new Date();
    this.currentTime =today.toLocaleTimeString();
    setInterval(()=>{
      var today = new Date();
      this.currentTime =today.toLocaleTimeString();
    },1000);
    this.randomNumber = 11;
  }

}
