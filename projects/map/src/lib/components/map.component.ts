import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  lat = 51.508742;
  lng = -0.12085;

  constructor() {}

  ngOnInit() {}
}
