import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import{Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  id;
  description;
  title;
  author;
  city;
  address;
  venue;
  date;
  admission;
  type;
  image;


  constructor(private firebaseService:FirebaseService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getListingDetails(this.id).subscribe(listing => {
      this.title = listing.title;
      this.author = listing.author;
      this.city = listing.city;
      this.address = listing.address;
      this.venue = listing.venue;
      this.date = listing.date;
      this.admission = listing.admission;
      this.type = listing.type;
      
    });
  }
  onEditSubmit() {
    let listing = {
      title: this.title,
      author:this.author,
      city:this.city,
      address:this.address,
      venue: this.venue,
      date: this.date,
      admission: this.admission,
      type: this.type
    }

    this.firebaseService.updateListing(this.id, listing);
    this.router.navigate(['/events/listings']);
  }

}
