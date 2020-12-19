import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ColorToFillClassPipe } from 'projects/commons/src/lib/color/pipes/color-to-fill-class/color-to-fill-class.pipe';
import { Color } from 'projects/commons/src/lib/color/entities/color';

@Component({
  selector: 'lib-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  @Input() color: Color = 'primary';
  @Input() size = 24;

  @HostBinding('class')
  get hostClass(): string {
    return this.toFill.transform(this.color);
  }

  constructor(private toFill: ColorToFillClassPipe) {}

  ngOnInit() {}
}
