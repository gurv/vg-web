import { Component } from '@angular/core';
import { CurrentProjectService } from 'projects/commons/src/lib/git/services/current-project/current-project.service';

@Component({
  selector: 'lib-current-project',
  templateUrl: './current-project.component.html',
})
export class CurrentProjectComponent {
  constructor(public currentProjectService: CurrentProjectService) { }
}
