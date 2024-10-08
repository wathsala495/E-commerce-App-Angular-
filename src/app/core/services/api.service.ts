import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOption={
    headers:new HttpHeaders({
      'Content-Type':"application/json",
      "Access-Control-Allow-origin":"*"
    })
  }

  constructor(private http:HttpClient) { }

  private formatErrors(error:any){
    return throwError(error.error)
  }

  // get(path:string, params:HttpParams =new HttpParams()):Observable<any>{
  //   return this.http.get(path,{params}).pipe(catchError(this.formatErrors))
  // }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(path, { params }).pipe(
      catchError(this.formatErrors) // Handle errors properly
    );
  }
  put(path:string,body:Object={}):Observable<any>{
    return this.http.put(path,JSON.stringify(body),this.httpOption).pipe(catchError(this.formatErrors))
  }
  post(path:string,body:Object={}):Observable<any>{
    return this.http.post(path,JSON.stringify(body),this.httpOption).pipe(catchError(this.formatErrors))
  }
 
  
  delete(path: string): Observable<any> {
    return this.http.delete(path).pipe(
      catchError(this.formatErrors) // Handle errors properly
    );
  }
  
}
