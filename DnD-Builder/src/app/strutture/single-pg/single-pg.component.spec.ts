import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePgComponent } from './single-pg.component';

describe('SinglePgComponent', () => {
  let component: SinglePgComponent;
  let fixture: ComponentFixture<SinglePgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SinglePgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinglePgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
