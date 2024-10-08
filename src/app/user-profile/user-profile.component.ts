import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../core/Model/object-model';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  userProfileForm!:FormGroup;
  userProfile:boolean=false;
   user_id!:number
   user_data:any;
   user_update_data:any;
   user_dto!:any
   user_profile_pic:any;
   user_language:any;
   user_role:any;


  constructor(private formBuilder:FormBuilder,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
     this.user_id=Number(sessionStorage.getItem('user_session_id'))
    //  this.getuser()
    this.userProfileForm=this.formBuilder.group({
      name:['',Validators.required],
          mobNumber:['',Validators.required],
          age:['',Validators.required],
          dob:['',Validators.required],
          email:['',Validators.required],
          password:['',Validators.required],
          addLine1:['',Validators.required],
          addLine2:['',Validators.required],
          city:['',Validators.required],
          state:['',Validators.required],
          zipCode:['',Validators.required],
          language:[[],Validators.required],
           gender:['',Validators.required],
          aboutYou:['',Validators.required],
          uploadPhoto:['',Validators.required],
          // agreetc:['',Validators.required],
          // role:['',Validators.required],
    })
    this.editUserData(this.user_id)
    this.updateProfile()
  }

get rf(){
  return this.userProfileForm.controls
}

editUserData(user_id:any){
   this.userService.getUserData(user_id).subscribe((data)=>{
    this.user_data=data;
    this.user_profile_pic=this.user_data.uploadPhoto,
    this.user_language=this.user_data.language
    console.log(this.user_data)
    this.user_role=this.user_data.role;
           this.userProfileForm.setValue({
            name:this.user_data.name,
        
            mobNumber:this.user_data.mobNumber,
            age:this.user_data.age,
            dob:this.user_data.dob,
            email:this.user_data.email,
            language:this.user_data.language,
            gender:this.user_data.gender,
            password:this.user_data.password,
            addLine1:this.user_data.address.addLine1 ,
            addLine2:this.user_data.address.addLine2,
            city:this.user_data.address.city,
            state:this.user_data.address.state,
            zipCode:this.user_data.address.zipCode,
            aboutYou:this.user_data.aboutYou,
            uploadPhoto:'',
            // agreetc:this.user_data.agreetc,
            // role:this.user_data.role
          
           })
   },err=>{
    console.log("my Error"+err)
   })
}

  // getuser(){
  //   this.userService.getUserData( this.user_id).subscribe((data:any)=>{
  //     this.user_data=data;
  //     console.log(this.user_data)
  //   })
  // }

  updateProfile(){
    this.userProfile=true;
    if(this.userProfileForm.invalid){
      return alert("invalid form")
    }
    this.user_update_data=this.userProfileForm.value;
    console.log("updated data:"+this.user_update_data)
    this.user_dto={
      name: this.user_update_data.name,
     mobNumber: this.user_update_data.mobNumber,
    age: this.user_update_data.age,
    dob: this.user_update_data.dob,
    email: this.user_update_data.email,

    password: this.user_update_data.password,
    address:{
      id:0,
      addLine1: this.user_update_data.addLine1,
      addLine2: this.user_update_data.addLine2,
      city: this.user_update_data.city,
      state: this.user_update_data.state,
      zipCode: this.user_update_data.zipCode,
    },
    language: this.user_update_data.language,
    gender: this.user_update_data.gender,
    aboutYou: this.user_update_data.aboutYou,
    uploadPhoto: (this.user_update_data.uploadPhoto ==""? this.user_profile_pic:this.user_update_data.uploadPhoto),
    // agreetc :this.user_update_data.agreetc,
    // role: this.user_update_data.role
    }
    this.userService.updateUserData(this.user_id,this.user_dto).subscribe((data)=>{
     alert("user updated successfully")
     if(this.user_role=='admin'){
      this.router.navigateByUrl('/admin-dashboard')
     }
     else if(this.user_role=='seller'){
      this.router.navigateByUrl('/seller-dashboard')
     }
     else if(this.user_role=='buyer'){
      this.router.navigateByUrl('/buyer-dashboard')
     }
    },err=>{
      console.log("my Error"+err)
    })

  }

}
