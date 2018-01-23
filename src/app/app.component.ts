import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  public active: boolean = false;
  constructor(public auth: DataService) {
    setTimeout(() => {
      console.log(auth.canActivate())
      this.active = auth.canActivate()
    }, 1500);
  }
  ngOnInit() {
  }

}