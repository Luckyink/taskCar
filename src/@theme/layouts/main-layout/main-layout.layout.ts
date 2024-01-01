import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { LoadingController, MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  styleUrls: ['./main-layout.layout.scss'],
  templateUrl: './main-layout.layout.html',
})
export class MainLayoutComponent {
  
  showBackButton : boolean;
  showMenuButton : boolean;
  showSaveButton : boolean;
  showMarkButton : boolean;

  constructor(private menuController : MenuController, public router: Router, private location: Location) {
    this.showBackButton = false;
    this.showMenuButton = true;
    this.showSaveButton = false;
    this.showMarkButton = false;
  }

  get routeName()
  {
    let returnRoute = "Car";

    this.showBackButton = false;
    this.showMenuButton = true;
    this.showSaveButton = false;
    this.showMarkButton = false;

    switch(this.router.url)
    {
      
      case "/car" : 
        returnRoute = "Car"
      break;
      case "/car/add-car":
        returnRoute = "Add Car"
        this.showBackButton = true;
        this.showMenuButton = false;
        this.showSaveButton = true;
      break;
      
    }

    return returnRoute;
    
  }

  goBack()
  {
    this.location.back();
  }
  
}
