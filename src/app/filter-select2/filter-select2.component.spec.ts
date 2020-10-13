import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSelect2Component } from './filter-select2.component';

describe('FilterSelect2Component', () => {
  let component: FilterSelect2Component;
  let fixture: ComponentFixture<FilterSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterSelect2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
