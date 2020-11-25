import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatTableModule } from '@angular/material/table';
import { ToolchainComponent } from './toolchain.component';

describe('FilterSummaryFilterComponent', () => {
  let component: ToolchainComponent;
  let fixture: ComponentFixture<ToolchainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ToolchainComponent],
      imports: [MatTableModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
