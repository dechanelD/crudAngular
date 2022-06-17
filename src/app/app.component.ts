import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
//import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud0';

  displayedColumns: string[] = ['nomProduit', 'categorieProduit', 'qualiteProduit', 'prixProduit','commentaireProduit', 'dateProduit', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private api:ApiService){

  }
  ngOnInit(): void {
    this.getAllProduct()
  }

  openDialog() {
        this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='Enregister'){
        this.getAllProduct()
      }
    })
  }

  getAllProduct(){
    this.api.getProduct()
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        },
        error:(err)=>{
          alert("erreur lors du chargement des donnees !")
        }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  supprimerProduit(id : number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        alert("Produit supprime avec succes !")
        this.getAllProduct()
      },
      error:()=>{
        alert("Echec lors de la suppression")
      }
    })
  }

  editProduct(row: any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='Modifier'){
        this.getAllProduct()
      }
  })

 
}
}
function id(id: any, number: any) {
  throw new Error('Function not implemented.');
}

