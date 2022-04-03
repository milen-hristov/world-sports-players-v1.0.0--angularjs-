import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css'],
})
export class AlertMessageComponent implements OnChanges {
  @Input() message: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.clearMessage();
  }

  clearMessage() {
    setTimeout(() => {
      this.message = '';
    }, 4000);
  }
}
