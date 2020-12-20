import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ImagePickerConf, NgpImagePickerComponent } from 'ngp-image-picker';
import { Image } from './image';

@Component({
  selector: 'ngx-image-grid-picker',
  templateUrl: './image-grid-picker.component.html',
  styleUrls: ['./image-grid-picker.component.scss']
})
export class ImageGridPickerComponent implements OnInit {
  @Input() config: ImagePickerConf = {
    borderRadius: "4px",
    language: "en",
    width: "100%",
    height: "150px",
    compressInitial: true,
  };
  @Input() images: Image[];
  @Output() imagesChange = new EventEmitter<Image[]>();
  @Output() onChanged = new EventEmitter<any>();
  @ViewChild('newPicker') newPicker: NgpImagePickerComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onImageChanged(base64: string, index: number) {
    this.onChanged.emit({
      index: index,
      oldImage: this.images[index],
      newImage: { src: base64 },
    });
    this.images[index] = { src: base64 };
    this.imagesChange.emit(this.images);
    setTimeout(() => this.newPicker.loadImage = false, 100)
  }
}
