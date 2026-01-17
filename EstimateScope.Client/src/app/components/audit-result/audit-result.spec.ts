import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditResult } from './audit-result';

describe('AuditResult', () => {
  let component: AuditResult;
  let fixture: ComponentFixture<AuditResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
