import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AppConfigService } from './providers/app-config.service';


//const endpoint1 = 'http://localhost:8080/products/';
//const endpoint = 'http://product-api-ibm-hr-systems-exec-comp.gamification-d3c0cb24e2b77f6869027abe3de4bca3-0001.sng01.containers.appdomain.cloud/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private config: AppConfigService) { }
  configvalues :any;
  private extractData(res: Response) {
    let body = res;
    
    return body || { };
  }
  getCategory(): Observable<any> {
    this.configvalues = this.config.getConfig();
    return this.http.get(this.configvalues["productApiUrl"] + 'getallcategory').pipe(
      map(this.extractData));
  }
  getProducts(catgry): Observable<any> {
    this.configvalues = this.config.getConfig();
    return this.http.get(this.configvalues["productApiUrl"] + 'getproductscat/cat/' + catgry).pipe(
      map(this.extractData));
  }
  getProductsSearch(searchtxt): Observable<any> {
    this.configvalues = this.config.getConfig();
    return this.http.get(this.configvalues["productApiUrl"] + 'getproducts/search/' + searchtxt).pipe(
      map(this.extractData));
  }
  getProductsBrand(brand): Observable<any> {
    this.configvalues = this.config.getConfig();
    return this.http.get(this.configvalues["productApiUrl"] + 'getproductsbrand/brand/' + brand).pipe(
      map(this.extractData));
  }
  getProduct(id): Observable<any> {
    this.configvalues = this.config.getConfig();
    return this.http.get(this.configvalues["productApiUrl"] + 'getproducts/id/' + id).pipe(
      map(this.extractData));

  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
