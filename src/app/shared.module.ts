import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AlertMessageComponent } from "./shared/alert-message/alert-message.component";
import { DateAsAgoPipe } from "./shared/dateAgo.pipe";
import { LoadingComponent } from "./shared/loading/loading.component";
import { PopupComponent } from "./shared/popup/popup.component";
import { SubstringPipe } from "./shared/substring.pipe";

@NgModule({
  declarations: [
    LoadingComponent,
    SubstringPipe,
    DateAsAgoPipe,
    PopupComponent,
    AlertMessageComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoadingComponent,
    SubstringPipe,
    DateAsAgoPipe,
    PopupComponent,
    AlertMessageComponent,
    CommonModule,
  ],
})
export class SharedModule {}
