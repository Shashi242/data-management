// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://6548ea34dd8ebcd4ab23dfaf.mockapi.io/tendercuts';
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  postItem(item: any): Observable<any> {
    const url = `${this.apiUrl}`; // Replace 'items' with your actual endpoint
    return this.http.post(url, item);
  }

  putItem(id: number, item: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`; // Replace 'items' with your actual endpoint
    return this.http.put(url, item);
  }


  // async postItem(item: any): Promise<any> {
  //   const url = `${this.apiUrl}`;
  //   const response = await this.http.post(url, item).toPromise();
  //   return response;
  // }

  // async putItem(id: number, item: any): Promise<any> {
  //   const url = `${this.apiUrl}/${id}`;
  //   const response = await this.http.put(url, item).toPromise();
  //   return response;
  // }

}
