import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  items: FirebaseListObservable<any>;
  name: any;
  msgVal: string ='';
  constructor(
    public af:AngularFire,
    private firebaseService:FirebaseService,
    private router: Router,
    private route:ActivatedRoute
  ) {
    this.items = af.database.list('/messages', {
     query: {
       limitToLast: 5
     }
    });

     this.af.auth.subscribe(auth => {
     if(auth) {
       this.name=auth;
     }
   });
   
   }

  chatSend(theirMessage: string) {
   this.items.push({message: theirMessage, name: this.name.google.displayName});
   this.msgVal = '';
 }

}
