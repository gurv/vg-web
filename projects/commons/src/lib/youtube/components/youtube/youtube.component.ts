import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'lib-youtube',
  templateUrl: './youtube.component.html',
})
export class YoutubeComponent implements OnInit {
  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
}
