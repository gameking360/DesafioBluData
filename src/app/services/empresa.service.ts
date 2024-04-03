import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  readonly url = "https://localhost:7020/api/Empresa"

  constructor(private http:HttpClient) { }

  //Get as empresas
  getEmpresas():Observable<any>{
    return this.http.get(this.url)
  }

  //Criar nova empresa
  postEmpresa(data:any):Observable<any>{
    let jsonEmpresa = JSON.stringify(data)
    const httpOptions = {
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      }),
      responseType: 'text' as 'json'
    }
    
    return this.http.post(this.url,jsonEmpresa,httpOptions)
  }
  
}
