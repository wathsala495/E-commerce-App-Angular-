import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule,DatePipe],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent implements  OnInit {
  order_dashboard_data:any
  total_order:any
  last_order_date:any
  total_product:number=0
  publish_product:number=0
  inactive_product:number=0
  draft_product:number=0
  product_dashboard_data:any
  constructor(private router:Router ,private customerService:CustomerService) { }
  ngOnInit(): void {
   this.sellerOrderDashboardData()
    this.sellerProductDashBoard()
   
  }
  sellerProductDashboard(){
    this.router.navigateByUrl("/seller/product")
  }
  sellerorderDashboard(){
    alert("this option for only WIP candidates")
  }
  sellerOrderDashboardData(){
    this.customerService.orderDashboardData().subscribe((data)=>{
      this.order_dashboard_data=data
      console.log("Order Dashboard Data:"+JSON.stringify(this.order_dashboard_data))
      this.total_order=Number(this.order_dashboard_data.length)
      this.last_order_date=this.order_dashboard_data[this.total_order-1].dateTime
    },err=>{
  console.log("My Error Data:"+err)
    })
  }
  sellerProductDashBoard(){
    this.customerService.productDashboardData().subscribe((data)=>{
       this.product_dashboard_data=data

       for(status in this.product_dashboard_data){
        if(this.product_dashboard_data[status].status=="publish"){
          ++this.publish_product
        }
        if(this.product_dashboard_data[status].status=="inactive"){
          ++this.inactive_product
        }
        if(this.product_dashboard_data[status].status=="draft"){
          ++this.draft_product
        }
        ++this.total_product
       }
    },err=>{
      console.log("My Error :"+err)
    })
  }

}
