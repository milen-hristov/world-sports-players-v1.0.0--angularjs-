import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.hidden') isClosed = true;

  @HostListener('click') toggleOpen() {
    this.isClosed = !this.isClosed;
  }
}
