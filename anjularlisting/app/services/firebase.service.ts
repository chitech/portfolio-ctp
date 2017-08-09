import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import  * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
   listing: FirebaseObjectObservable<any>;
   listings: FirebaseListObservable<any>;
   folder: any;

  constructor(private af: AngularFire) {
    this.folder = 'eventimages';
    this.listings = this.af.database.list('/events/listings') as FirebaseListObservable<Listing[]>

   }

  getListings() {
    return this.listings;

  }
  getListingDetails(id) {
    this.listing = this.af.database.object('/events/listings/'+id) as FirebaseObjectObservable<Listing>
    return this.listing;
  }
  
  addListing(listing) {
    //Create root reference 
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        listing.image = selectedFile.name;
        listing.path = path;
        return this.listings.push(listing);
      });
    }
  }

  updateListing (id, listing) {
    return this.listings.update(id, listing);

  }
  deleteListing (id) {
    return this.listings.remove(id);

  }

}

interface Listing {
  $key?:string;
  title?:string;
  type?:string;
  venue?:string;
  state?:string;
  city?:string;
  author:string;
  admission:string;
  date:string;
  image?:string;
  path?:string;

}
