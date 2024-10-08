import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
public product_url="http://localhost:3000/products/"
  constructor(private http:HttpClient,private apiService:ApiService) { }

  allProducts():Observable<any>{
   return this.apiService.get(this.product_url)
  //  return this.apiService.get('/api/products/')
  }
  addNewProduct(product_dto:any):Observable<any>{
    return this.apiService.post(this.product_url,product_dto)
  }
  singleProduct(id:any){
  return this.apiService.get(this.product_url+id)
  }
  updateProduct(id:any,product_dto:any):Observable<any>{
    return this.apiService.put(this.product_url+id,product_dto)
  }
  deleteProduct(id:any):Observable<any>{
    return this.apiService.delete(this.product_url+id)
  }

}
