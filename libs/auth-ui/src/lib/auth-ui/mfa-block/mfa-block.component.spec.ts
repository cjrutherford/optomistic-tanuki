import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfaBlockComponent } from './mfa-block.component';

describe('MfaBlockComponent', () => {
  let component: MfaBlockComponent;
  let fixture: ComponentFixture<MfaBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfaBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MfaBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
