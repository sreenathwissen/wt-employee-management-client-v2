import { Component, OnInit } from '@angular/core';
import { MOCK_DATA } from './home.component.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mockData = MOCK_DATA

  constructor() { }

  ngOnInit(): void {
  }

}
