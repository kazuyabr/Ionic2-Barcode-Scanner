import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { Clipboard } from 'ionic-native';
import { ToastController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {

	Barcode_list: any = [];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
  }

  presentToast(msg) {
  	let toast = this.toastCtrl.create({
  		message: msg,
  		duration: 3000,
  		showCloseButton: true,
  		closeButtonText: 'Ok'
  	});
  	toast.present();
  }

  copy(text) {
  	Clipboard.copy(text);
  	this.presentToast('Copied to clipboard');
  }

  share(text) {
  	SocialSharing.share(text, '', '', '').then(() => {
  		console.log('shared');
  	}).catch(() => {
  		this.presentToast('Error: Unable to share')
  	})
  }

  scan() {
  	BarcodeScanner.scan().then((barcodedata) => {
  		console.log(barcodedata);
  		if(!barcodedata.cancelled){
  			this.Barcode_list.push(barcodedata);
  		}
  	}, (err) => {
  		alert(err);
  	})
  }

}
