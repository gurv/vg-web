import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lat: number = 51.508742;
  lng: number = -0.120850;

  constructor() { }

  ngOnInit() {
  }

}
