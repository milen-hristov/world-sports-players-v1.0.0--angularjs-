import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  // API url
  baseApiUrl = environment.cloudinary;
  cloudinaryPreset = environment.cloudinaryPreset;

  constructor(private http: HttpClient) {}

  // Returns an observable
  upload(file): Observable<any> {
    // Create form data
    const imageFormData = new FormData();

    // Store form name as "file" with file data
    imageFormData.append("file", file);
    imageFormData.append("upload_preset", this.cloudinaryPreset);

    // Make http post request over api
    // with formData as req
    return this.http.post(`${this.baseApiUrl}/image/upload`, imageFormData);
  }
}