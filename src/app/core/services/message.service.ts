import { Injectable } from "@angular/core";
import {ToastrService } from 'ngx-toastr' 
@Injectable({
    providedIn:'root'
})

export class MessageService{
    constructor(private toastr:ToastrService){}

    showCreateSuccess(){
        this.toastr.success("Insert data successfully!", "Success");
    }
    showDeleteSuccess(){
        this.toastr.success("Deleted successfully!","Success");
    }
    showUpdateSuccess(){
        this.toastr.success("Updated successfully!","Succcess");
    }
    showError(message:string){
        this.toastr.error(message,"Error");
    }
}