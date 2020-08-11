import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocsComponent } from './docs.component';
import { Component } from '@angular/core';

@Component({
  selector: 'scully-content',
  template: ''
})
class MockScullyContentComponent {}

describe('DocsComponent', () => {
  let component: DocsComponent;
  let fixture: ComponentFixture<DocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsComponent, MockScullyContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
