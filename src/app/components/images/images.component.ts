import { Component, OnInit } from '@angular/core';
import { FileSelectDirective,  FileUploader } from 'ng2-file-upload';
// import * as M from 'materialize-css';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import * as io from 'socket.io-client';

 const URL = 'http://localhost:3000/api/chatapp/upload-image';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  selectedFile: any;
  user: any;
  socket: any;
  images = [];
  uploader: FileUploader = new FileUploader({
      url: URL,
      disableMultipart: true
  });

  constructor(
    private tokenServie: TokenService,
    private userService: UserService
  ) {
   this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenServie.GetPayload();
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  onFileSelected(event) {

         const file: File = event[0];
         this.ReadAsBase64(file)
         .then( (result) => {
             this.selectedFile = result;
         })
         .catch( (error) => { console.log(error); });
  }

  upload() {
      if (this.selectedFile) {
        this.userService.AddImage(this.selectedFile)
        .subscribe( (data) => {
          this.socket.emit('refresh', {});
          const filePath = <HTMLInputElement>document.getElementById('filePath');
          filePath.value = '';
        }, err => console.log(err));
      }

  }

  ReadAsBase64(file): Promise<any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
        reader.addEventListener('load', () => {
          resolve(reader.result);
        });

        reader.addEventListener('error', (event) => {
            reject(event);
        });

        reader.readAsDataURL(file);
    });

    return fileValue;
  }

  GetUser() {
    this.userService.GetUserById(this.user._id)
     .subscribe( (data) => {

      this.images = data.user.images;
     }, err => console.log(err));
   }

   SetProfileImage(image) {

     this.userService.SetDefaultImage(image.imgId, image.imgVersion)
       .subscribe ( (data) => {
         this.socket.emit('refresh', {});

       }, err => console.log(err));
   }



}
