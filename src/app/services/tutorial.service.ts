import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tutorial } from '../models/tutorial.model';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8080/api/tutorials';
@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http:HttpClient ) {}
    getAll(params : any): Observable<Tutorial[]> {
      return this.http.get<Tutorial[]>(baseUrl,{params}); 
   
}
  get(id:any): Observable<any>{
    return this.http.get<Tutorial>(`${baseUrl}/${id}`);

  }

  create(data:any): Observable<any>{
    return this.http.post(baseUrl,data);

  }

  update(id:any, data:any): Observable<any>{
    return this.http.put(`${baseUrl}/${id}`,data);

  }
  delete(id:any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);

  }
  deleteAll(): Observable<any>{
    return this.http.delete(baseUrl);

  }

  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }
  
}
