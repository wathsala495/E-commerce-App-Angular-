import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerModule } from '../../../customer.module';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent implements OnInit {

  all_products:any;
  show_Checkout:boolean=false

  constructor(private router:Router,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct(){
    this.customerService.allProduct().subscribe((data:any)=>{
      this.all_products=data;

    },err=>{console.log(err)})
  }
  buyProduct(id:number){
    this.show_Checkout=true;
    this.customerService.quickBuyProduct(id);
    this.router.navigateByUrl('/checkout')
  }

  addToCart(){
    alert("THis is SHowercase")
  }

}
