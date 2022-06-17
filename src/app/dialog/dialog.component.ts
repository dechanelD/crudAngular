import { Component, Inject, inject, OnInit } from '@angular/core';
import { Form, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import{MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  fraicheurList = ["neuf", "seconde main", "reconditionne"]
  produitForm!: FormGroup; // A chercher
  btnAction : string = "Enregistrer"

  constructor(private formBuilder : FormBuilder, 
        private api: ApiService,
        @Inject(MAT_DIALOG_DATA) public ediData: any,
        private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.produitForm = this.formBuilder.group({
      nomProduit : ['', Validators.required],
      categorieProduit : ['', Validators.required],
      qualiteProduit : ['', Validators.required],
      prixProduit : ['', Validators.required],
      commentaireProduit : ['', Validators.required],
      dateProduit : ['', Validators.required]
    })
    if(this.ediData){
      this.btnAction = "Modifier"
      this.produitForm.controls['nomProduit'].setValue(this.ediData.nomProduit)
      this.produitForm.controls['categorieProduit'].setValue(this.ediData.categorieProduit)
      this.produitForm.controls['qualiteProduit'].setValue(this.ediData.qualiteProduit)
      this.produitForm.controls['commentaireProduit'].setValue(this.ediData.commentaireProduit)
      this.produitForm.controls['dateProduit'].setValue(this.ediData.dateProduit)
    }
  }

  ajouterProduit(){
    if(!this.ediData){
      if(this.produitForm){
        this.api.postProduct(this.produitForm.value)
        .subscribe({
          next :(res)=>{
            alert("Produit ajoute avec succes !")
            this.produitForm.reset()
            this.dialogRef.close('Enregister')
          },
          error :()=>{
            alert("Erreur lors de l'ajout du prodiut !")
          }
        })
      }
    }else{
      this.updateProduct()
    }
  }

updateProduct(){
  this.api.putProduct(this.produitForm.value, this.ediData.id)
  .subscribe({
    next:(res)=>{
      alert("Produit modifie !")
      this.produitForm.reset()
      this.dialogRef.close('Modifier')
    },
    error :()=>{
      alert("Erreur lors de la modification")
    }
  })
}
  

}
