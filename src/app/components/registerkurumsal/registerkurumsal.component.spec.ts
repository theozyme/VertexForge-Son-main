import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterKurumsalComponent } from './registerkurumsal.component';

describe('RegisterKurumsalComponent', () => {
  let component: RegisterKurumsalComponent;
  let fixture: ComponentFixture<RegisterKurumsalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterKurumsalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterKurumsalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
