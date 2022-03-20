import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCreatedPlayersComponent } from './my-created-players.component';

describe('MyCreatedPlayersComponent', () => {
  let component: MyCreatedPlayersComponent;
  let fixture: ComponentFixture<MyCreatedPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCreatedPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCreatedPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
