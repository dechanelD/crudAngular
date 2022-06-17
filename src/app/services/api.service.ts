import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postProduct(data : any){
    return this.http.post<any>("http://localhost:3000/produitList/", data);
  }

  getProduct(){
    return this.http.get<any>("http://localhost:3000/produitList/");
  }

  putProduct(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/produitList/"+id, data)
  }

  deleteProduct(id: number){
    return this.http.delete<any>("http://localhost:3000/produitList/"+id)
    
  }
}
