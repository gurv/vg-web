import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { testGitStatus } from 'projects/commons/src/lib/git/entities/git-status.spec';
import { GitCommandService } from 'projects/commons/src/lib/git/services/git-command/git-command.service';
import { gitCommandServiceSpy } from 'projects/commons/src/lib/git/services/git-command/git-command.service.spec';
import {
  SIDE_HEADER_DATA,
  TAB_HEADER_DATA
} from 'projects/commons/src/lib/tabs/components/tab-header/tab-header.component';
import { newTestTab } from 'projects/commons/src/lib/tabs/components/tab-header/tab-header.component.spec';
import { TabsSide } from 'projects/commons/src/lib/tabs/entities/tabs-side';
import { TabsService } from 'projects/commons/src/lib/tabs/services/tabs/tabs.service';
import { GitStatusTabHeaderComponent } from './git-status-tab-header.component';
import { GitStatusTabHeaderModule } from './git-status-tab-header.module';

import SpyObj = jasmine.SpyObj;

@Component({
  selector: 'lib-test',
  template: `test`,
})
class TestComponent { }

describe('GitStatusTabHeaderComponent', () => {
  let component: GitStatusTabHeaderComponent;
  let fixture: ComponentFixture<GitStatusTabHeaderComponent>;
  let gitCommandService: SpyObj<GitCommandService>;

  beforeEach(
    waitForAsync(() => {
      gitCommandService = gitCommandServiceSpy();
      TestBed.configureTestingModule({
        imports: [GitStatusTabHeaderModule],
        providers: [
          TabsService,
          { provide: TAB_HEADER_DATA, useValue: newTestTab(TestComponent) },
          { provide: SIDE_HEADER_DATA, useValue: TabsSide.TOP },
          { provide: GitCommandService, useValue: gitCommandService },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GitStatusTabHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set content', () => {
    gitCommandService.statusSubject.next(testGitStatus());

    expect(component.icon.content).toBe('5');
  });
});
