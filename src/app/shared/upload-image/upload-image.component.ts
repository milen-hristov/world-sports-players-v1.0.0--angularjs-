import { Component } from '@angular/core';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent {
  loading: boolean = false;
  file: File = null;

  constructor(private fileUploadService: FileUploadService) {}

  onChange(event) {
    this.file = <File>event.target.files[0];

    this.loading = !this.loading;
    this.fileUploadService.upload(this.file).subscribe((event: any) => {
      if (typeof event === 'object') {
        this.loading = false;
        this.fileUploadService.imagePathChanged.next(event.url);
      }
    });
  }
}
