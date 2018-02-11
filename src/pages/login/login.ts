import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';

import { LoginService } from './login.service';

import { OrderPage } from '../../pages/order/order';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from "rxjs/Subscription";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	user: any;
	pass: any;
	private timerSubscription: AnonymousSubscription;
  private postsSubscription: AnonymousSubscription;
 
	MoveToOrder(){
		//10016
		//ed9d07d5
		console.log("move page");
		this.navCtrl.setRoot(OrderPage, {
			data1: this.user,
			data2: this.pass
		});
	}

	hash:string = '';
  public cus: any=[];
  public error: string ="";
  logindetails: boolean=false;
  public inputuser: string = '';
	public inputpass: string ='';
	public inputusername: string ='';
	public static customerID=0;
  constructor(private _md5: Md5, private log: LoginService, public navCtrl: NavController){
				this.log.getCustomer().then(res =>{
					this.cus=res;
				});
				this.refreshData();
	}

  login(event : any)
  {
		console.log(this.user);
		console.log(Md5.hashStr(this.pass));
		for(let data of this.cus)
		{
			
			if(this.user == data.customerID)
      {	
				this.error="Incorrect Password";
				console.log("matchuser");
				if(Md5.hashStr(this.pass) == data.cusPassword)
				{
          console.log(data);
					this.inputuser=data.customerID;
					this.inputpass=data.cusPassword;
					this.log.getCustomerID(data.customerID);
					this.inputusername= data.cusFirstName + " " + data.cusMiddleName + ". " + data.cusLastName;
					this.logindetails=true;
					this.error=""
					console.log("matchpass");
					
					this.MoveToOrder();
					console.log("yeye");
				}
			}
			console.log(data.cusPassword);
		}
	}
	 private refreshData(): void {
         
        this.postsSubscription = this.log.getCustomers().subscribe(

        data  => {
                    console.log(this.cus.length);
                    var i =0;
                    for (let customer of data)
                    {
                            //data[0].picture=this.sanitizer.bypassSecurityTrustUrl(data[0].picture);
                            //console.log(data);
                            this.cus[i]=({
                                'customerID': customer.customerID, 
																'cusPassword': customer.cusPassword, 
																'number': customer.number, 
																'address': customer.address,
																'cusLastName': customer.cusLastName, 
																'cusMiddleName': customer.cusMiddleName, 
																'cusFirstName': customer.cusFirstName,				
																'verificationCode': customer.verificationCode 				
                            });
                            i=i+1;//FINISH REFRESH DATA AND ERROR TRAPPING FOR ITEM PRICE
                            
                            //console.log(item);
                            //console.log(i);
                    }
                    if(i < this.cus.length)
                    {
                        let dif = this.cus.length - i;
                        let test;
                        for(dif;dif>0;dif--)
                        {
                                test=this.cus.pop();
                                console.log(test);
                        }
                    }
                    i=0;   
                    // console.log(this.items.data);                
                    // console.log("latestest");      
            //this.items.data = data;
		    this.subscribeToData();
            console.log(this.cus);
        },
        function (error) {
            console.log(error);
        },
        function () {
            console.log("complete");
        }
        );
        
    }
    private subscribeToData(): void {

        this.timerSubscription = Observable.timer(3000)
            .subscribe(() => this.refreshData());
    }
     public ngOnDestroy(): void {

            if (this.postsSubscription) {
            this.postsSubscription.unsubscribe();
            }
            if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            }
    }

}
