import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods  } from 'angularfire2';
import {FirebaseService} from './services/firebase.service';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { SearchComponent } from './components/search/search.component';
import { ChatComponent } from './components/chat/chat.component';

export const firebaseConfig = {
  apiKey: "AIzaSyDIhEURtot3TwcYK8y2dbyEeWPp0aoJ61Y",
    authDomain: "unierostalk2017.firebaseapp.com",
    databaseURL: "https://unierostalk2017.firebaseio.com",
    projectId: "unierostalk2017",
    storageBucket: "unierostalk2017.appspot.com",
    messagingSenderId: "941376250164"
};

const FirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

const appRoutes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'listings',
    component: ListingsComponent
  },
  {
    path:'listing/:id',
    component:ListingComponent
  },
  {
    path: 'add-listing',
    component: AddListingComponent
  },
  {
    path: 'edit-listing/:id',
    component: EditListingComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  }
  
  
] 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
    SearchComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, FirebaseAuthConfig),
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
