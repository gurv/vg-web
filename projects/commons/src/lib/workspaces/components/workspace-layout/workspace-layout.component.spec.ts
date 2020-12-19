import { ComponentPortal } from '@angular/cdk/portal';
import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { newTestTab } from 'projects/commons/src/lib/tabs/components/tab-header/tab-header.component.spec';
import { EMPTY_SIDE_CONFIG, SideConfiguration } from 'projects/commons/src/lib/workspaces/entities/side-configuration';
import { TabsConfiguration } from 'projects/commons/src/lib/workspaces/entities/tabs-configuration';
import { WorkspaceLayoutComponent } from './workspace-layout.component';
import { WorkspaceLayoutModule } from './workspace-layout.module';

@Component({
  selector: 'lib-test',
  template: 'test',
})
class TestComponent { }

@NgModule({
  imports: [CoreTestModule],
  declarations: [TestComponent],
})
class TestModule { }

describe('WorkspaceLayoutComponent', () => {
  let component: WorkspaceLayoutComponent;
  let fixture: ComponentFixture<WorkspaceLayoutComponent>;
  const tabsConf = new TabsConfiguration([newTestTab(TestComponent)], 0, 50);
  const sideConf = new SideConfiguration(tabsConf, tabsConf, 20);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TestModule, WorkspaceLayoutModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create with all sides', () => {
    component.center = new ComponentPortal(TestComponent);
    component.centerMinWidth = 40;
    component.centerMinHeight = 40;
    component.left = sideConf;
    component.right = sideConf;
    component.bottom = sideConf;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.verticalSplits.length).toBe(2);
    expect(component.horizontalSplits.length).toBe(3);
  });

  it('should create no bottom', () => {
    component.center = new ComponentPortal(TestComponent);
    component.left = sideConf;
    component.right = sideConf;
    component.bottom = EMPTY_SIDE_CONFIG;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.verticalSplits.length).toBe(1);
    expect(component.horizontalSplits.length).toBe(3);
  });

  it('should create no right', () => {
    component.center = new ComponentPortal(TestComponent);
    component.left = sideConf;
    component.right = EMPTY_SIDE_CONFIG;
    component.bottom = sideConf;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.verticalSplits.length).toBe(2);
    expect(component.horizontalSplits.length).toBe(2);
  });

  it('should create no right (2)', () => {
    component.center = new ComponentPortal(TestComponent);
    component.left = EMPTY_SIDE_CONFIG;
    component.right = sideConf;
    component.bottom = sideConf;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.verticalSplits.length).toBe(2);
    expect(component.horizontalSplits.length).toBe(2);
  });

  it('should create only bottom', () => {
    component.center = new ComponentPortal(TestComponent);
    component.left = EMPTY_SIDE_CONFIG;
    component.right = EMPTY_SIDE_CONFIG;
    component.bottom = sideConf;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.verticalSplits.length).toBe(2);
    expect(component.horizontalSplits.length).toBe(1);
  });

  describe('with all tabs', () => {
    beforeEach(() => {
      component.center = new ComponentPortal(TestComponent);
      component.left = sideConf;
      component.right = sideConf;
      component.bottom = sideConf;
      fixture.detectChanges();
    });

    it('should bottomPaneExpanded', () => {
      const spy = spyOn(component.verticalSplit, 'show');
      component.bottomPaneExpanded();

      expect(spy).toHaveBeenCalledWith(1);
    });

    it('should bottomPaneCollapsed', () => {
      const spy = spyOn(component.verticalSplit, 'hide');
      component.bottomPaneCollapsed();

      expect(spy).toHaveBeenCalledWith(1);
    });

    it('should bottomPaneHidden', () => {
      const spy = spyOn(component.bottomSideSplit, 'closeTabs');
      component.bottomPaneHidden();

      expect(spy).toHaveBeenCalledWith();
    });

    it('should bottomPaneHidden (2)', () => {
      const spy = spyOn(component.bottomSideSplit, 'closeTabs');
      component.bottomPaneHidden();

      expect(spy).toHaveBeenCalledWith();
    });

    it('should leftPaneExpanded', () => {
      const spy = spyOn(component.horizontalSplit, 'show');
      component.leftPaneExpanded();

      expect(spy).toHaveBeenCalledWith(0);
    });

    it('should leftPaneCollapsed', () => {
      const spy = spyOn(component.horizontalSplit, 'hide');
      component.leftPaneCollapsed();

      expect(spy).toHaveBeenCalledWith(0);
    });

    it('should rightPaneExpanded', () => {
      const spy = spyOn(component.horizontalSplit, 'show');
      component.rightPaneExpanded();

      expect(spy).toHaveBeenCalledWith(2);
    });

    it('should rightPaneCollapsed', () => {
      const spy = spyOn(component.horizontalSplit, 'hide');
      component.rightPaneCollapsed();

      expect(spy).toHaveBeenCalledWith(2);
    });

    it('should leftRightPaneHidden left', () => {
      const spy = spyOn(component.leftSideSplit, 'closeTabs');
      component.leftRightPaneHidden([0, null]);

      expect(spy).toHaveBeenCalledWith();
    });

    it('should leftRightPaneHidden right', () => {
      const spy = spyOn(component.rightSideSplit, 'closeTabs');
      component.leftRightPaneHidden([2, null]);

      expect(spy).toHaveBeenCalledWith();
    });

    it('should leftRightPaneHidden kamoulox', () => {
      component.leftRightPaneHidden([42, null]);

      // eslint-disable-next-line jasmine/expect-single-argument
      expect().nothing();
    });
  });
});
