export class User{
name !:string;
mobNumber !:string;
age !:number;
dob !:string;
email !:string;
password !:string;
address !:Address;
language !:string;
gender !:string;
aboutYou !:string;
uploadPhoto !:string;
agreetc !:boolean;
role !:string;
}
export class Address{
    addLine1!:string;
    addLine2!:string;
    city!:string
    state!:string
    zipCode!:string
    id!:number
}
export class Product{
    id!:number
    name!:string
   uploadPhoto!:string
   productDesc!:string
   mrp!:number
   dp!:number
   status!:boolean
}

export class Order{
    id!:number
userId!:number
sellerId!:number
product!:Product
deleveryAddress!:Address
contact!:string
dateTime!:string
}