import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownDirective } from '../dropdown.directive';

import { AlertMessageComponent } from './alert-message/alert-message.component';
import { DateAsAgoPipe } from './dateAgo.pipe';
import { LoadingComponent } from './loading/loading.component';
import { PopupComponent } from './popup/popup.component';
import { SubstringPipe } from './substring.pipe';
import { UploadImageComponent } from './upload-image/upload-image.component';

@NgModule({
  declarations: [
    LoadingComponent,
    SubstringPipe,
    DateAsAgoPipe,
    PopupComponent,
    AlertMessageComponent,
    DropdownDirective,
    UploadImageComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoadingComponent,
    SubstringPipe,
    DateAsAgoPipe,
    PopupComponent,
    AlertMessageComponent,
    CommonModule,
    DropdownDirective,
    UploadImageComponent,
  ],
})
export class SharedModule {}
