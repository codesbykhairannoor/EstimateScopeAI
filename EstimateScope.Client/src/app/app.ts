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
  lastProjectData: any = {}; // Simpan buat PDF

  constructor(private estimateService: EstimateService) {}

  handleAnalyze(formData: any) {
    this.isAnalyzing = true;
    this.lastProjectData = formData; // Simpan data input (rate, type, dll)
    this.results = [];

    this.estimateService.analyzeProject(formData).subscribe({
      next: (res: any) => {
        this.results = res.data;
        this.currentRisk = res.riskLevel;
        this.isAnalyzing = false;
      },
      error: () => {
        this.isAnalyzing = false;
        alert('Audit Gagal. Cek API Key atau Koneksi.');
      }
    });
  }
}