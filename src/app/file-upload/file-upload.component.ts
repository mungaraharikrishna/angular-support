import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @ViewChild('inputFile') inputFile!: ElementRef;
  selectedFile: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  changeFile(event: any) {
    if (event.target.files && event.target.files.length) {
      let file = event.target.files[0];
      if (file) {
        let fileSize: any = file.size / 1024 / 1024;
        fileSize = fileSize.toFixed(2); 
        if (file.size >= 5242880) {
          this.selectedFile = file;
        } else {
          alert(`to small, minimum is 5MB. You file size is: ${fileSize} MB'`);
          this.inputFile.nativeElement.value =  null;
          this.selectedFile = null;
        }
      }
    }
  }

  upload() {
    let formData = new FormData();
    formData.append('file', this.selectedFile);
    //Here you can send 'formData' variable to back end service for exaple;
    this.http.post('http://localhost:4200', formData).subscribe({})
  }

}
