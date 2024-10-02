import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../core/Model/object-model';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit {

  all_user_data:any;
  single_user_data:any;
  addEditUserForm!:FormGroup;
  user_dto!:User
  user_reg_data:any;
  edit_user_id:any;
  upload_file_name!:string;
  addEditUser:boolean = false;//for form validation
  add_user:boolean=false;
  edit_user:boolean=false;
  popup_header!:string
  signInFormValue:any={}
  constructor(private router:Router,private adminService:AdminService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
     this.getAllUser();
    this.addEditUserForm=this.formBuilder.group({
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
  getAllUser(){
    this.adminService.allUser().subscribe((data)=>{
   this.all_user_data=data
    },err=>{
      console.log("My error"+err)
    })
  }

}
// 1:19
