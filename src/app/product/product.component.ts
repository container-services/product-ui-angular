import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import {GlobaldataserviceService} from '../globaldataservice.service';
import { environment } from '../../environments/environment.prod';
import { AppConfigService } from '../providers/app-config.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:any = [];
  category:any = [];
  skuAttribute = [];
  configvalues :any;
  imageService;
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router,private dataService: GlobaldataserviceService, private config: AppConfigService) { }

  ngOnInit() {
    console.log("ProductComponent in Product");
    this.configvalues = this.config.getConfig();
    console.log("----getconfig--="+this.configvalues["imageServiceUrl"]);
    //this.imageService = environment.imageServiceUrl;
    this.imageService = this.configvalues["imageServiceUrl"];
    //this.products = [];
    if(this.route.snapshot.params['cat'] !=null){
      this.rest.getProducts(this.route.snapshot.params['cat']).subscribe((data: {}) => {
        console.log("in Cat");
        this.products =  data['response'];
      });
    }else if(this.route.snapshot.params['brand'] !=null){
      this.rest.getProductsBrand(this.route.snapshot.params['brand']).subscribe((data: {}) => {
        console.log("in Brand");
        this.products =  data['response'];
      });
    }else{
      let searchText = this.dataService.getSearchText();
      console.log("searchText in Product comp="+searchText);
      this.rest.getProductsSearch(searchText).subscribe((data: {}) => {
        //console.log(data);
        this.products = data['response'];
        

        
        var lookup1 = [];
        var lookup2 = [];

        var skuAttribute1 ;
        var skuAttribute2;
        var skuAttributeValue1 = [];
        var skuAttributeValue2 = [];
        for(let item of this.products){
          for(let key in item){
            skuAttribute1 = item.sku_attribute1;
            skuAttribute2 = item.sku_attribute2;
            var sku_attribute_value1 = item.sku_attribute_value1;
            var sku_attribute_value2 = item.sku_attribute_value2;

            if (!(sku_attribute_value1 in lookup1)) {
              lookup1[sku_attribute_value1] = 1;
              skuAttributeValue1.push(sku_attribute_value1);
            }

            if (!(sku_attribute_value2 in lookup2)) {
              lookup2[sku_attribute_value2] = 1;
              skuAttributeValue2.push(sku_attribute_value2);
            }

          }
          
        }

       

        this.skuAttribute  = 
          [
            {"Attribute1":skuAttribute1},
            {"Attribute1Value":skuAttributeValue1},
            {"Attribute2":skuAttribute2},
            {"Attribute2Value":skuAttributeValue2}
          ]

        console.log(this.skuAttribute);
        //this.skuAttribute = json;
        for(let item of this.skuAttribute){
          
          for(let key in item){
            //console.log("-- skuAtt="+key);
          }


        }

        //var skuAttribute2 = this.products['sku_attribute2'];
        
        //console.log("-- skuAttribute2"+skuAttribute2);
        

  
  
        
      });
    }
  }
  getProductsSearch(){
    var searchtxt = this.route.snapshot.params['searchtxt'];
    console.log(searchtxt);
    this.rest.getProductsSearch(searchtxt).subscribe((data: {}) => {
      console.log(data);
      this.products = data['response'];

            //this.router.navigate(['/products']);
    });

  }
/*
  getProducts() {
    this.products = [];
    this.rest.getProducts().subscribe((data: {}) => {
      console.log(data);
      this.products = data['response'];
    });
  }
  */

  
 

}
