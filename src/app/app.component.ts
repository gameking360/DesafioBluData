import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EmpresaService } from './services/empresa.service';
import {MatTableModule} from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog';
import { EmpresaComponent } from './empresa/empresa.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatTableModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  
  title = 'FrontEnd';

 

}
