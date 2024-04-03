import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

   link = 'https://localhost:7020/api/Fornecedor'
  
  constructor(private http:HttpClient) { }


  //Get fornecedores 
  getFornecedores():Observable<any>{
    return this.http.get(this.link)
  }

  //Get fornecedores pelo nome da empresa
  getFornecedoresByEmpresa(empresa:any):Observable<any>{
    
    if(empresa != ""){
      return this.http.get(this.link+'/empresa/'+empresa)
    }
    return this.getFornecedores()
  }

  //Get fornecedores pela data de cadastro
  getFornecedoresByData(data:any):Observable<any>{
    if(data != ""){
     
      return this.http.get(this.link+'/data/'+data)
    } 

    return this.getFornecedores()
  }

  //Get fornecedores pelo nome
  getFornecedoresByNome(name:any):Observable<any>{
    if(name != ""){
      return this.http.get(this.link+"/nome/"+name)
    }
    return this.getFornecedores()
  }

  //Adicionar uma pessoa física
  addPessoaFisica(data:any):Observable<any>{
    let jsonPF = JSON.stringify(data)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json' 
      }),
      responseType: 'text' as 'json'
    };

    return this.http.post(this.link+'/pessoaFisica',jsonPF,httpOptions)

  }

  //Adicionar uma pessoa jurídica
  addPessoaJuridica(data:any):Observable<any>{
    let jsonPJ = JSON.stringify(data)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      }),
      responseType: 'text' as 'json'
    };

    return this.http.post(this.link + '/pessoaJuridica',jsonPJ,httpOptions)
  }
}
