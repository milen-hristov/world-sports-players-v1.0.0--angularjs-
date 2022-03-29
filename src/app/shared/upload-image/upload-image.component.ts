import { Component, OnInit } from "@angular/core";
import { FileUploadService } from './file-upload.service';

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.css"],
})
export class UploadImageComponent implements OnInit {
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file

  // Inject service
  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {}

  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe((event: any) => {
      if (typeof event === "object") {
        // Short link via api response
        this.shortLink = event.link;

        this.loading = false; // Flag variable

        console.log(event.url);
        
      }
    });
  }
}

