import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../services/empresa.service';
import { MatDialog } from '@angular/material/dialog';
import { EmpresaComponent } from '../empresa/empresa.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [MatTableModule,RouterModule],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css'
})
export class InitialComponent implements OnInit {

  companys:any[] = []
  displayCollumns = ['id','uf','nomeFantasia','cnpj']


  constructor(private empresaService:EmpresaService,private dialog:MatDialog){}

  ngOnInit(): void {
    this.getEmpresas()
  }

  getEmpresas(){
    this.empresaService.getEmpresas().subscribe(data => {
      this.companys = data
    })
  }

  openFormEmpresa(){
    const dialog = this.dialog.open(EmpresaComponent)

    dialog.afterClosed().subscribe({
      next:() => this.getEmpresas(),
      error: (msg) => alert(msg)
    })
  }

}
