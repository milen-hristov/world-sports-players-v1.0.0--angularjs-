import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavouritePlayersComponent } from './my-favourite-players.component';

describe('MyFavouritePlayersComponent', () => {
  let component: MyFavouritePlayersComponent;
  let fixture: ComponentFixture<MyFavouritePlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFavouritePlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFavouritePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
