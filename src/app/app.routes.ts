import { Routes } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { InitialComponent } from './initial/initial.component';

export const routes: Routes = [
    {path:"empresa",component:EmpresaComponent},
    {path:"fornecedor",component:FornecedorComponent},
    {path:"",component:InitialComponent}
];
