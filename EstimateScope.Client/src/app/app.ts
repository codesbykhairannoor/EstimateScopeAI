import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimateService } from './services/estimate'; 
import { HeroComponent } from './components/hero/hero';
import { AuditResultComponent } from './components/audit-result/audit-result';
import { NavbarComponent } from './components/navbar/navbar'; // Import Navbar
import { FooterComponent } from './components/footer/footer'; // Import Footer

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeroComponent, AuditResultComponent, NavbarComponent, // Tambahkan di sini
    FooterComponent ],
  templateUrl: './app.html', // Sesuaikan nama file
})
export class AppComponent {
  isAnalyzing = false;
  results: any[] = [];
  currentRisk: string = 'Low';

  constructor(private estimateService: EstimateService) {}

  handleAnalyze(description: string) {
    this.isAnalyzing = true;
    this.results = [];

    this.estimateService.sendProjectDescription(description).subscribe({
      next: (res: any) => {
        this.results = res.data;
        this.currentRisk = res.riskLevel || 'Low';
        this.isAnalyzing = false;
      },
      error: (err) => {
        console.error(err);
        this.isAnalyzing = false;
      }
    });
  }
}