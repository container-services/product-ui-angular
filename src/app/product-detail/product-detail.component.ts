import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product:any;
  productImage:any;

  constructor(private sanitizer: DomSanitizer,public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getProduct(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.product =  data['response'];
    });

   /* this.rest.getProductImage(this.route.snapshot.params['id']).subscribe((data: {}) => {
      let objectURL = 'data:image/png;base64,' + data;
      this.productImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      
    });*/

  }

}