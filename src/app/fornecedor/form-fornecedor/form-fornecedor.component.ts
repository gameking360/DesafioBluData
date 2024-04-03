import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import {  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Telefone } from '../../interfaces/telefone';
import { FornecedorService } from '../../services/fornecedor.service';
import {  MatDialogRef } from '@angular/material/dialog';
import { error } from 'console';

@Component({
  selector: 'app-form-fornecedor',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './form-fornecedor.component.html',
  styleUrl: './form-fornecedor.component.css'
})



export class FormFornecedorComponent implements OnInit{

companys:any[] = []



actualForm:FormGroup;
formFornecedorFisica:FormGroup;
formFornecedorJuridica:FormGroup;

telefones:Telefone[] = []

constructor(private _empresaService:EmpresaService, private _fb:FormBuilder, private _fornecedorService:FornecedorService,
  private dialog:MatDialogRef<FormFornecedorComponent>){
  this.formFornecedorFisica = _fb.group({
    id:0,
    name:'',
    idEmpresa:0,
    horaCadastro: new Date(Date.now()),
    telefones: this.telefones,
    cpf: '',
    rg: '',
    dataNascimento: new Date()
  })

  this.formFornecedorJuridica = _fb.group({
    id:0,
    name:'',
    idEmpresa:0,
    horaCadastro: new Date(Date.now()),
    telefones: this.telefones,
    cnpj: ''
  })

  this.actualForm = this.formFornecedorFisica

}

ngOnInit(): void {
  this._empresaService.getEmpresas().subscribe(data => {
    this.companys = data
  })

}


loadForm(){
  
  
  if(this.actualForm === this.formFornecedorFisica){
   
    this.actualForm = this.formFornecedorJuridica
    console.log(this.actualForm)
    
  }

  else if(this.actualForm == this.formFornecedorJuridica){
    this.actualForm = this.formFornecedorFisica

  }
  console.log(this.actualForm)

}



addPhone(number:any){
  
  if(number.length > 15) {
    alert("Formato incorreto")
    
    return;
  }

  let dado:Telefone

  if(this.actualForm === this.formFornecedorJuridica){
     dado  = {
      FornecedorId:0,
      Juridico: true,
      Numero: number
    }
  }
  else {
     dado = {
      FornecedorId:0,
      Juridico: false,
      Numero: number
    }
  }
  
  


  this.telefones.push(dado)
}


 handlePhone(event:any){
  let input = event.target
  input.value = this.phoneMask(input.value)
}

phoneMask(value:any) {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}

mascaraCnpj(event:any){
let input = event.target
input.value = this.CNPJMask(input.value)
}

private CNPJMask(value:any){
  if(!value) return ""

  value = value.replace(/[A-Z]/gi,'')
  value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,"$1.$2.$3/$4-$5")
  return value;
}

mascaraCPF(event:any){
  let input = event.target
  input.value = input.value.replace(/[A-Z]/gi,'')
  input.value = input.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4") ?? ""
}

mascaraRG(event:any){
  let input = event.target
  input.value = input.value.replace(/[A-Z]/gi,'')
  input.value = input.value.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/,"$1.$2.$3-") ?? ""
}

removePhone(number:any){

  let teste = this.telefones.indexOf(number)
  this.telefones.splice(teste,1)
}

formSubmit(){


  this.actualForm.controls['telefones'].setValue(this.telefones);


  if(this.actualForm == this.formFornecedorFisica){
    
    if(this.actualForm.controls['cpf'].value.length != 14){
      alert("Insira um cpf válido")
      return
    }


    this._fornecedorService.addPessoaFisica(this.actualForm.value).subscribe({
      next: () => {
        this.dialog.close()
      },
      error: (err) => {
        alert(err.error)
      }
    })
  }
  
  else if(this.actualForm == this.formFornecedorJuridica){
    this._fornecedorService.addPessoaJuridica(this.actualForm.value).subscribe({
      next: () => {
        this.dialog.close()
      },
      error: (err) => {
        alert(err.error)
      }
    })
  }
  

}

}
