import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAppSocketComponent } from './chat-app-socket.component';

describe('ChatAppSocketComponent', () => {
  let component: ChatAppSocketComponent;
  let fixture: ComponentFixture<ChatAppSocketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatAppSocketComponent]
    });
    fixture = TestBed.createComponent(ChatAppSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
