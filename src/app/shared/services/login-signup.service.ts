import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {
     public login_url="http://localhost:3000"
     public reg_url="http://localhost:3000"
  constructor(private http:HttpClient,private apiService:ApiService) { }

  authLogin(user_name:any,password:any){
    // return this.apiService.get(this.login_url='/user?email='+user_name+'&password='+password)
    console.log('api/user?email='+user_name+'&password='+password)
    return this.apiService.get('api/user?email='+user_name+'&password='+password)

  }
  userRegister(user_dto:any){
     return this.apiService.post(this.reg_url+'/user',user_dto)
  }
  adminLogin(user_name:any,password:any){
    // return this.apiService.get(this.login_url='/user?email='+user_name+'&password='+password+"&role=admin")
    return this.apiService.get('api/user?email='+user_name+'&password='+password+"&role=admin")

  }
}
