import { Component, OnInit } from '@angular/core';
import { Order, Product, User } from '../../../core/Model/object-model';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
       single_product_id:any
       user_id:any;
       individual_product!:Product;
       user_detail!:User;
       user_address:any;
       user_contact_no:any;
       order_dto!:Order;

       constructor(private customerService:CustomerService,private router:Router){}
        ngOnInit(): void {
           this.customerService.currentProduct.subscribe((produt)=>{
             this.single_product_id=produt;
           }) 
           this.user_id=sessionStorage.getItem('user_session_id')
           this.productDetail(this.single_product_id);
           this.userAddress(this.user_id);
        }


        productDetail(single_product_id:any){
          this.customerService.individualProduct(single_product_id).subscribe((data)=>{
            this.individual_product=data;
            console.log("My single Product"+JSON.stringify(this.individual_product));
          },err=>{
            console.log("My error"+err);
          })
        }

        userAddress(user_id:any){
          this.customerService.userDetail(user_id).subscribe((data)=>{
            this.user_address=data.address;
            this.user_contact_no=data.mobNumber;
          },error=>{
            console.log("MyError"+error);
          })
        }
        placeOrder(){
          this.order_dto={
            id:0,
    userId:this.user_id,
    sellerId:2,
     product:{
  id:this.individual_product.id,
  name:this.individual_product.name,
  uploadPhoto:this.individual_product.uploadPhoto,
  productDesc:this.individual_product.productDesc,
  mrp:this.individual_product.mrp,
  dp:this.individual_product.dp,
  status:this.individual_product.status,
},
deleveryAddress:{
  addLine1:this.user_address.addLine1,
  addLine2:this.user_address.addLine2,
  city:this.user_address.city,
  state:this.user_address.state,
  zipCode:this.user_address.zipCode,
  id:0
},
contact: this.user_contact_no,
dateTime:new Date().toLocaleTimeString()
          }

          console.log("Palse order dtl",this.order_dto)
          this.customerService.insertNewOrder(this.order_dto).subscribe((data)=>{
            alert("your order place succefully")
            this.router.navigateByUrl('/buyer-dashboard')
          },err=>{
            console.log("My error"+err);
          })
        }

}
