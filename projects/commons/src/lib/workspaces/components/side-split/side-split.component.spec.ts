import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { newTestTab } from 'projects/commons/src/lib/tabs/components/tab-header/tab-header.component.spec';
import { TabsPosition } from 'projects/commons/src/lib/tabs/entities/tabs-position';
import { TabsSide } from 'projects/commons/src/lib/tabs/entities/tabs-side';
import { SideConfiguration } from 'projects/commons/src/lib/workspaces/entities/side-configuration';
import { EMPTY_TABS_CONFIG, TabsConfiguration } from 'projects/commons/src/lib/workspaces/entities/tabs-configuration';
import { SideSplitComponent } from './side-split.component';
import { SideSplitModule } from './side-split.module';

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

describe('SideSplitComponent', () => {
  let component: SideSplitComponent;
  let fixture: ComponentFixture<SideSplitComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TestModule, SideSplitModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SideSplitComponent);
    component = fixture.componentInstance;
    component.id = 'test';
    component.side = TabsSide.TOP;
  });

  it('should ngOnInit no start', () => {
    component.config = new SideConfiguration(
      EMPTY_TABS_CONFIG,
      new TabsConfiguration([newTestTab(TestComponent)], 0, 50),
      42,
    );
    fixture.detectChanges();

    expect(component.splits.length).toBe(1);
    expect(component.endTabsIndex).toBe(0);
  });

  it('should ngOnInit no end', () => {
    component.config = new SideConfiguration(
      new TabsConfiguration([newTestTab(TestComponent)], 0, 50),
      EMPTY_TABS_CONFIG,
      42,
    );
    fixture.detectChanges();

    expect(component.splits.length).toBe(1);
  });

  it('should ngOnInit unselected', () => {
    component.config = new SideConfiguration(
      new TabsConfiguration([newTestTab(TestComponent)], -1, 50),
      new TabsConfiguration([newTestTab(TestComponent)], -1, 50),
      42,
    );
    fixture.detectChanges();

    expect(component.startTabsSelected).toBe(false);
    expect(component.endTabsSelected).toBe(false);
  });

  describe('with both tabs', () => {
    beforeEach(() => {
      component.id = 'test';
      component.side = TabsSide.TOP;
      component.config = new SideConfiguration(
        new TabsConfiguration([newTestTab(TestComponent)], 0, 50),
        new TabsConfiguration([newTestTab(TestComponent)], 0, 50),
        42,
      );
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.start).toBe(component.config.start);
      expect(component.end).toBe(component.config.end);
      expect(component.splits.length).toBe(2);
    });

    it('should tabUnselected', () => {
      const hide = spyOn(component.split, 'hide');
      const emit = spyOn(component.collapse, 'emit');
      component.tabUnselected(TabsPosition.START);

      expect(hide).toHaveBeenCalledWith(0);
      expect(emit).not.toHaveBeenCalled();

      component.tabUnselected(TabsPosition.END);

      expect(hide).toHaveBeenCalledWith(1);
      expect(emit).not.toHaveBeenCalled();

      component.startTabsContent.selectedTab = null;
      component.endTabsContent.selectedTab = null;
      component.tabUnselected(TabsPosition.END);

      expect(emit).toHaveBeenCalledWith();
    });

    it('should tabSelected start ', () => {
      const show = spyOn(component.split, 'show');
      const hide = spyOn(component.split, 'hide');
      const emit = spyOn(component.expand, 'emit');
      component.startTabsContent.selectedTab = null;
      component.tabSelected(TabsPosition.START, null);

      expect(show).toHaveBeenCalledWith(0);
      expect(hide).not.toHaveBeenCalled();
      expect(emit).toHaveBeenCalledWith();
    });

    it('should tabSelected start also hide end', () => {
      const show = spyOn(component.split, 'show');
      const hide = spyOn(component.split, 'hide');
      const emit = spyOn(component.expand, 'emit');
      component.startTabsContent.selectedTab = null;
      component.endTabsContent.selectedTab = null;
      component.tabSelected(TabsPosition.START, null);

      expect(show).toHaveBeenCalledWith(0);
      expect(hide).toHaveBeenCalledWith(1);
      expect(emit).toHaveBeenCalledWith();
    });

    it('should tabSelected end ', () => {
      const show = spyOn(component.split, 'show');
      const hide = spyOn(component.split, 'hide');
      const emit = spyOn(component.expand, 'emit');
      component.endTabsContent.selectedTab = null;
      component.tabSelected(TabsPosition.END, null);

      expect(show).toHaveBeenCalledWith(1);
      expect(hide).not.toHaveBeenCalled();
      expect(emit).toHaveBeenCalledWith();
    });

    it('should tabSelected end also hide start', () => {
      const show = spyOn(component.split, 'show');
      const hide = spyOn(component.split, 'hide');
      const emit = spyOn(component.expand, 'emit');
      component.endTabsContent.selectedTab = null;
      component.startTabsContent.selectedTab = null;
      component.tabSelected(TabsPosition.END, null);

      expect(show).toHaveBeenCalledWith(1);
      // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
      expect(hide).toHaveBeenCalled();
      expect(emit).toHaveBeenCalledWith();
    });

    it('should paneHidden start', () => {
      const unselectTab = spyOn(component.startTabsContent, 'unselectTab');
      component.paneHidden([0, null]);

      expect(unselectTab).toHaveBeenCalledWith();
    });

    it('should paneHidden end', () => {
      const unselectTab = spyOn(component.endTabsContent, 'unselectTab');
      component.paneHidden([1, null]);

      expect(unselectTab).toHaveBeenCalledWith();
    });

    it('should paneHidden kamoulox', () => {
      component.paneHidden([42, null]);

      // eslint-disable-next-line jasmine/expect-single-argument
      expect().nothing();
    });

    it('should paneShown', () => {
      component.paneShown([0, null]);

      // eslint-disable-next-line jasmine/expect-single-argument
      expect().nothing();
    });

    it('should closeTabs', () => {
      const unselectStartTab = spyOn(component.startTabsContent, 'unselectTab');
      const unselectEndTab = spyOn(component.endTabsContent, 'unselectTab');
      component.closeTabs();

      expect(unselectStartTab).toHaveBeenCalledWith();
      expect(unselectEndTab).toHaveBeenCalledWith();
    });

    it('should closeTabs (2)', () => {
      component.startTabsContent = null;
      component.endTabsContent = null;
      component.closeTabs();

      expect(true).toBe(true);
    });
  });
});
