import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AlertMessageComponent } from "./shared/alert-message/alert-message.component";
import { LoadingComponent } from "./shared/loading/loading.component";
import { PopupComponent } from "./shared/popup/popup.component";
import { SubstringPipe } from "./shared/substring.pipe";

@NgModule({
  declarations: [
    LoadingComponent,
    SubstringPipe,
    PopupComponent,
    AlertMessageComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoadingComponent,
    SubstringPipe,
    PopupComponent,
    AlertMessageComponent,
    CommonModule,
  ],
})
export class SharedModule {}
