import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private angularFireStore:AngularFirestore) { }

  addCategory(data:Category){
    data.id = this.angularFireStore.createId();
    return this.angularFireStore.collection('category').add(data);
  }

  getAllCategories(){
    return this.angularFireStore.collection('category').snapshotChanges();
  }

  deleteCategory(data:Category){
    return this.angularFireStore.doc('category'+data.id).delete();
  }

  updateCategory(data:Category){
    return this.angularFireStore.doc('category'+data.id).update(data);
  }




}
