import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundRoot } from './not-found-root';

describe('NotFoundRoot', () => {
  let component: NotFoundRoot;
  let fixture: ComponentFixture<NotFoundRoot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundRoot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundRoot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
