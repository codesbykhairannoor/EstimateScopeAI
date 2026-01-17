import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import Router
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, // WAJIB ADA
    NavbarComponent, 
    FooterComponent
  ],
  template: `
    <div class="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <app-navbar></app-navbar>

      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>

      <app-footer></app-footer>
    </div>
  `
})
export class AppComponent {}