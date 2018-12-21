import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = '/assets/data/Pizzamenu.json';
  constructor(private _http: HttpClient) { }
  getMenu() {
   return this._http.get<Object>(this.url);
  }
}
