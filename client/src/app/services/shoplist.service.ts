import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Shoplist } from '../interfaces/shoplist'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ShoplistService {

  private apiUrl = 'http://localhost:3001';
  private httpOptions = {
    headers: { 'Content-Type': 'application/json' }
  }

  constructor(private http: HttpClient) { }

  getLists(): Observable<Shoplist[]> {
    return this.http.get<Shoplist[]>(`${this.apiUrl}/lists`);
  }

  getList(id: number): Observable<Shoplist> {
    return this.http.get<Shoplist>(`${this.apiUrl}/lists/${id}`);
  }

  addList(list: Shoplist): Observable<Shoplist> {
    return this.http.post<Shoplist>(`${this.apiUrl}/lists`, list);
  }

  updateList(id: number, newList: Shoplist): Observable<Shoplist> {
    return this.http.put<Shoplist>(`${this.apiUrl}/lists/${id}`, newList);
  }

  removeList(id: number): Observable<Shoplist> {
    return this.http.delete<Shoplist>(`${this.apiUrl}/lists/${id}`);
  }

  getLastItem(): Observable<Shoplist[]> {
    return this.http.get<Shoplist[]>(`${this.apiUrl}/lists?_sort=id&_order=desc&_limit=1`)
  }
}
