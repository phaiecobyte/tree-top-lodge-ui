import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/models/category';
import { MessageService } from '../../../core/services/message.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  imports: [ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class AdminCategoryComponent implements OnInit{
  categoryList:Category[]=[];
  modalTitle:string="Add Category"
  frm!:FormGroup
  constructor(
    private fb:FormBuilder
  ){}

  ngOnInit(): void {
    this.iniFrm();
  }

  iniFrm(){
    this.frm = this.fb.group({
      name:['',[Validators.required]],
      description:['']
    })
  }

  save(){
    console.log("form data:", this.frm.value);
  }
  
  
}
