import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera'
import { ImagePicker } from '@ionic-native/image-picker';

@IonicPage()
@Component({
  selector: 'page-product-image',
  templateUrl: 'product-image.html',
})
export class ProductImagePage {

  public images: string[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private imagePicker: ImagePicker,
    public toast: ToastController
  ) {
    this.images = []
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductImagePage');
  }

  openCamera() {
    console.log('Open camera')

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options)
      .then((imageData) => {
        console.log('Took from camera successfully');
        this.images.push('data:image/jpeg;base64,' + imageData)
      }, (err) => {
        console.log(`Error taking image: ${JSON.stringify(err)}`);
        this.displayToastMessage(`Se produjo un error inesperado al tomar la foto`)
        this.navCtrl.pop();
      });
  }

  pickFromGallery() {
    console.log('pickFromGallery')

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options)
      .then((imageData) => {
        console.log('Picked from gallery with success');
        this.images.push('data:image/jpeg;base64,' + imageData)
      }, (err) => {
        console.error(`Error getting picture from gallery: ${JSON.stringify(err)}`);
        this.displayToastMessage(`Se produjo un error inesperado al tomar la foto`)
        this.navCtrl.pop();
      });
  }

  uploadImages() {
    this.navCtrl.push('ProductInfoPage', { images: this.images })
  }

  displayToastMessage(msg: string) {
    this.toast.create({
      message: msg,
      duration: 3000
    }).present()
  }
}
