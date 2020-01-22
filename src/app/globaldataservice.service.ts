import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobaldataserviceService {
  private searchText;
  constructor() { }
  setSearchTxt(val){
    this.searchText = val;
  }
  getSearchText(){
    return this.searchText;
  }
}
