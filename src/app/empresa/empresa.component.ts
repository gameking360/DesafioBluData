import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../services/empresa.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent implements OnInit {

  formEmpresa:FormGroup;
  ufs:{[key:string]:string} = {}

  constructor(private _empresaService:EmpresaService,_fb:FormBuilder, private dialog:MatDialogRef<EmpresaComponent>){
    this.formEmpresa = _fb.group({
      id:0,
      uf:"",
      nomeFantasia:"",
      cnpj:""
    })

  
  }

  ngOnInit(): void {
    this.ufs["AC"] = "Acre"
    this.ufs["AL"] = "Alagoas"
    this.ufs["AP"] = "Amapá"
    this.ufs["AM"] = "Amazonas"
    this.ufs["BA"] = "Bahia"
    this.ufs["CE"] = "Ceará"
    this.ufs["DF"] = "Distrito Federal"
    this.ufs["ES"] = "Espírito Santo"
    this.ufs["GO"] = "Goiás"
    this.ufs["MA"] = "Maranhão"
    this.ufs["MT"] = "Mato Grosso"
    this.ufs["MS"] = "Mato Grosso do Sul"
    this.ufs["MG"] = "Minas Gerais"
    this.ufs["PA"] = "Pará"
    this.ufs["PB"] = "Paraíba"
    this.ufs["PR"] = "Paraná"
    this.ufs["PE"] = "Pernambuco"
    this.ufs["PI"] = "Piauí"
    this.ufs["RJ"] = "Rio de Janeiro"
    this.ufs["RN"] = "Rio Grande do Norte"
    this.ufs["RS"] = "Rio Grande do Sul"
    this.ufs["RO"] = "Rondônia"
    this.ufs["RR"] = "Roraima"
    this.ufs["SC"] = "Santa Catarina"
    this.ufs["SP"] = "São Paulo"
    this.ufs["SE"] = "Sergipe"
    this.ufs["TO"] = "Tocantins"
  }

  formSubmit(){
    this._empresaService.postEmpresa(this.formEmpresa.value).subscribe({
      next: (msg:any) => {
        this.dialog.close()
      },
      error: (err) => {
        alert(err.error)
      }
    })
  }


  getKeys(){
    return Object.keys(this.ufs)
  }
  

}
