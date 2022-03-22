import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent{
  @Input() message: string;
  @Output() closePopup = new EventEmitter<void>();

  onClose() {
    this.closePopup.emit();
  }
}
