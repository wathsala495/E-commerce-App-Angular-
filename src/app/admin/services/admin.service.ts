import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public user_url="http://localhost:3000/user/"
 public product_url=" http://localhost:3000/product"
public all_user=  "http://localhost:3000/user"

  constructor(private apiService:ApiService) { }

  userDashboardData(){
    return this.apiService.get(this.user_url)
  }
  productDashboardData(){
    return this.apiService.get(this.product_url)
  }
  allUser(){
    return this.apiService.get(this.all_user)
  }
  addUser(user_dto:any){
    return this.apiService.post(this.user_url,user_dto)
  }
  // get data of individual user
  singleUser(user_id:any){
    return this.apiService.get(this.user_url,user_id)
  }

  //update data of individual user
  editUser(user_id:any,user_dto:any){
    return this.apiService.put(this.user_url+user_id,user_dto)
  }
  //delete user
  deleteuser(user_id:any){
     return this.apiService.delete(this.user_url+user_id)
  }
}

