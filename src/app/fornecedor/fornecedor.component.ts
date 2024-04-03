import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FornecedorService } from '../services/fornecedor.service';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormFornecedorComponent } from './form-fornecedor/form-fornecedor.component';

@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [MatTableModule,FormsModule],
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.css'
})
export class FornecedorComponent implements OnInit{

  filtroSelecionado:any = "";
  @ViewChild('Nome') filtroNome!:ElementRef<HTMLInputElement>
  @ViewChild('Empresa') filtroEmpresa!:ElementRef
  @ViewChild('Data') filtroData!:ElementRef

fornecedores:any[] = []
displayCollumns = ['name','empresa','horaCadastro','tipo']

constructor(private service:FornecedorService, private dialog:MatDialog){
  
}


ngOnInit(): void {
  this.getAllFornecedores()
 
}

getAllFornecedores(){
  this.service.getFornecedores().subscribe(data => {
    this.fornecedores = data
  })
}

Filtrar(){
  
  
  switch(this.filtroSelecionado){
  
    case "Empresa": this.service.getFornecedoresByEmpresa(this.filtroEmpresa.nativeElement.value).subscribe(data => {
                       this.fornecedores = data
                      })
                    break
    case "Data": this.service.getFornecedoresByData(this.filtroData.nativeElement.value).subscribe(data => {
                      this.fornecedores = data  
                      })
                  break
    case "Nome": this.service.getFornecedoresByNome(this.filtroNome.nativeElement.value).subscribe(data => {
                    this.fornecedores = data
                      })
                  break
    default:  console.log("Escolha de filtro inexistente") 
          this.service.getFornecedores().subscribe(data => {
      this.fornecedores = data
    })
    break
  
  }

}




openFormFornecedor(){
  const dialog = this.dialog.open(FormFornecedorComponent)

  dialog.afterClosed().subscribe({
    next:() => this.getAllFornecedores(),
    error: (msg) => alert(msg)
  })
}

}
