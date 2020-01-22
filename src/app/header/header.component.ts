import { Component, OnInit,Input } from '@angular/core';
import {GlobaldataserviceService} from '../globaldataservice.service';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { RestService } from '../rest.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() productData = { searchtxt:''}
  category:any = [];
  constructor(private location: Location,private formBuilder: FormBuilder, public rest:RestService,private route: ActivatedRoute, private router: Router, private dataService: GlobaldataserviceService) { 

  }

  ngOnInit() {
    this.getCategory();
  }
  searchProducts(){
    console.log("Called searchProducts in header" );
    this.dataService.setSearchTxt(this.productData.searchtxt);
    // override the route reuse strategy
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['/products']));
  }

  searchProductsByCategory(category){
    console.log("Called searchProducts in header" );
    this.dataService.setSearchTxt(this.productData.searchtxt);
    // override the route reuse strategy
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['/products/'+category]));
  }

  getCategory(){
    this.category = [];
    this.rest.getCategory().subscribe((data: {}) =>{
      console.log(data);
      this.category = data['response'];
    });
  }

}
