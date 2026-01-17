import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <--- WAJIB ADA
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // <--- MASUKKAN SINI
  templateUrl: './navbar.html'
})
export class NavbarComponent {lang = inject(LangService);}