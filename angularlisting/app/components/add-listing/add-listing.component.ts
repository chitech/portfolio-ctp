import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  description:any;
  title:any;
  author:any;
  city:any;
  address: any;
  venue:any;
  date:any;
  admission:any;
  type:any;
  image:any;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onAddSubmit() {
    let listing = {
      title: this.title,
      description: this.description,
      author:this.author,
      city:this.city,
      address: this.address,
      venue:this.venue,
      date:this.date,
      admission:this.admission,
      type:this.type,
      image:this.image

    }
    console.log(this.title);
     this.firebaseService.addListing(listing);
    this.router.navigate(['listings']);


  }


}
