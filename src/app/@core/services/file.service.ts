import { RestResponse } from './../models/rest-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

// const BASE_URL = `${environment.apiUrl}/file`;
const BASE_URL = `http://128.199.118.150:8000/api/file`;

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  upload(base64: string, type: string): Observable<RestResponse<File>> {
    const filename = Date.now().toString() + '.' + type?.split('/')[1];
    const blob = this.dataURItoBlob(base64, type);
    const file = new File([blob], filename, { type: type });

    const formData: FormData = new FormData();
    formData.append('file', file, filename);
    return this.http.post<RestResponse<File>>(`${BASE_URL}/upload`, formData);
  }

  dataURItoBlob(dataURI: string, type: string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: type });    
  }

  base64MimeType(encoded) {
    var result = null;
    if (typeof encoded !== 'string') {
      return result;
    }
    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
      result = mime[1];
    }
    return result;
  }
}
