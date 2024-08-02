import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private basseUrl:string = 'http://localhost:4502';
  private apiUrl = '/bin/fetchProviderData';

  constructor(private http: HttpClient) { }

  getProviderData(): Observable<any> {
    // Replace 'username' and 'password' with your AEM credentials
    const username = 'admin';
    const password = 'admin';
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(this.basseUrl + this.apiUrl, { headers });
  }

//TODO: TO Deploy to AEM instance uncomment the following method and comment out the above method

  // getProviderData(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }
}

