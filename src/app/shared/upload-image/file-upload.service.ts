import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  baseApiUrl = environment.cloudinary;
  cloudinaryPreset = environment.cloudinaryPreset;

  constructor(private http: HttpClient) {}

  upload(file): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append("file", file);
    imageFormData.append("upload_preset", this.cloudinaryPreset);

    return this.http.post(`${this.baseApiUrl}/image/upload`, imageFormData);
  }
}