import { Component, OnInit,Input, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobaldataserviceService} from '../globaldataservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  category:any = [];
  products:any = [];
  searchForm: FormGroup;
  submitted: boolean = false;

  @Input() productData = { searchtxt:''}
  constructor(private formBuilder: FormBuilder,public rest:RestService, private route: ActivatedRoute, private router: Router, private dataService: GlobaldataserviceService) { 

  }
  onSubmit() {
    this.submitted = true;
    let searchtxt = this.searchForm.get("searchTxt");
    console.log(searchtxt)
  }
  ngOnInit() {
    //this.getProducts();
    this.getCategory();
  }
  searchProducts(){
    console.log("Called searchProducts in home" );
      this.products = [];
      this.dataService.setSearchTxt(this.productData.searchtxt);
      this.router.navigate(['/products']);
      /*
      this.rest.getProductsSearch(this.productData.searchtxt).subscribe((data: {}) => {
        console.log(data);
        this.products = data['response'];
       
        this.router.navigate(['/products']);
      });
     */
  }
  getCategory(){
    this.category = [];
    this.rest.getCategory().subscribe((data: {}) =>{
      console.log(data);
      this.category = data['response'];
    });
  }

}
