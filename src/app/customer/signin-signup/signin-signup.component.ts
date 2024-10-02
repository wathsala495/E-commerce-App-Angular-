import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css',

})
export class SigninSignupComponent {
    regForm:boolean=false;
    signUpform!:FormGroup;
    signInForm!:FormGroup;
    signUpsubmitted=false;
    href:string='';
    user_data:any;
    user_dto!:any;
    user_reg_data:any;
    signInFormValue:any={}
    constructor(private router:Router,private formBuilder:FormBuilder,private loginService:LoginSignupService){
      
    }

    ngOnInit():void{
        this.href=this.router.url;
        if (this.href=='/sign-up'){
          this.regForm=true
        }
        else if(this.href=='/sign-in'){
          this.regForm=false
        }
        this.signUpform=this.formBuilder.group({
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
          agreetc:['',Validators.required],
          role:['',Validators.required],
          

        })
        
    }
    get rf(){
      return this.signUpform.controls     
    }
    onSubmitSignUp()
    
    
{
  console.log(this.signUpform.value)

  this.signUpsubmitted=true
  if(this.signUpform.invalid){
       return alert("invalid")
  }
  console.log("hello")
 this.user_reg_data=this.signUpform.value;
       this.user_dto={
     name: this.user_reg_data.name,
     mobNumber: this.user_reg_data.mobNumber,
    age: this.user_reg_data.age,
    dob: this.user_reg_data.dob,
    email: this.user_reg_data.email,

    password: this.user_reg_data.password,
    address:{
      id:0,
      addLine1: this.user_reg_data.addLine1,
      addLine2: this.user_reg_data.addLine2,
      city: this.user_reg_data.city,
      state: this.user_reg_data.state,
      zipCode: this.user_reg_data.zipCode,
    },
    language: this.user_reg_data.language,
    gender: this.user_reg_data.gender,
    aboutYou: this.user_reg_data.aboutYou,
    uploadPhoto: this.user_reg_data.uploadPhoto,
    agreetc :this.user_reg_data.agreetc,
    role: this.user_reg_data.role
 }
console.log(this.user_dto)
 this.loginService.userRegister(this.user_dto).subscribe((data)=>{
    alert("User Register Succefull")
    this.router.navigateByUrl('/sign-in')
 })

}
onSubmitSignIn(){
  this.loginService.authLogin(this.signInFormValue.userEmail, this.signInFormValue.userPassword).subscribe(data=>{
    this.user_data = data;
    if(this.user_data.length ==1){
      if(this.user_data[0].role =="seller"){
        sessionStorage.setItem("user_session_id", (this.user_data[0].id));
        sessionStorage.setItem("role", this.user_data[0].role);
        this.router.navigateByUrl('/seller-dashboard');
      }else if(this.user_data[0].role =="buyer"){
        sessionStorage.setItem("user_session_id", (this.user_data[0].id));
        sessionStorage.setItem("role", this.user_data[0].role);
        this.router.navigateByUrl('/buyer-dashboard');
      }else{
        alert("Invalid login details");
      }
    }else{
      alert("Invalid")
    }
    console.log(this.user_data)
  }, error=>{
    console.log("My error", error)
  })
}   
 }
