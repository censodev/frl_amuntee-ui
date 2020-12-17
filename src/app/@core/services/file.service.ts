import { RestResponse } from './../models/rest-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

const BASE_URL = `${environment.apiUrl}/file`;

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  upload(base64: string, filename: string): Observable<RestResponse<File>> {
    const type = base64.substring("data:".length, base64.indexOf(";base64"))
    const blob = this.dataURItoBlob(base64, type);
    const file = new File([blob], filename, { type: type });

    const formData: FormData = new FormData();
    formData.append('file', file, filename);
    return this.http.post<RestResponse<File>>(`${BASE_URL}/upload`, formData);
  }

  dataURItoBlob(dataURI: string, type: string = 'image/png'): Blob {
    const padding = '='.repeat((4 - dataURI.length % 4) % 4);
    dataURI = (dataURI + padding).replace(/-/g, '+').replace(/_/g, '/');
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: type });
  }

  convertBase64toBlob(content, contentType): Blob {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [
    ];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
      type: contentType
    }); //statement which creates the blob
    return blob;
  }

  generateFilename(ext: string): string {
    return Date.now().toString() + Math.random() + '.' + ext;
  }
}
