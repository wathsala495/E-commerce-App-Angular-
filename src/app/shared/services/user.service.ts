import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  public user_url="http://localhost:3000/api/user/"
  constructor(private apiService:ApiService) { }
  // get individual data
  getUserData(user_Id:number){
    return this.apiService.get('api/user/'+user_Id)
  }
  // update data by user id
  updateUserData(user_id:number,user_dto:any){
    return this.apiService.put(this.user_url+user_id,user_dto)
  }
}
