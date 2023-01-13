import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:4000/';
  constructor(private http: HttpClient) {
  }
  postTypeRequest(url: string, payload: any) {  //gia na steiloume kapoio payload sto backend sto url pou dhlwnoume kathe fora
    return this.http.post(`${this.baseUrl}${url}`,
      payload).pipe(map(res => {
      return res;
    }));
  }
}
