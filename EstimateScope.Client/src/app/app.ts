import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimateService } from './services/estimate'; // Sesuaikan path service lu
import { HeroComponent } from './components/hero/hero.component';
import { AuditResultComponent } from './components/audit-result/audit-result.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeroComponent, AuditResultComponent], // Import komponen baru
  templateUrl: './app.component.html',
})
export class AppComponent {
  isAnalyzing = false;
  results: any[] = [];
  currentRisk: string = 'Low';

  constructor(private estimateService: EstimateService) {}

  // Fungsi ini dipanggil sama Hero Component
  handleAnalyze(description: string) {
    this.isAnalyzing = true;
    this.results = []; // Kosongkan dulu

    this.estimateService.sendProjectDescription(description).subscribe({
      next: (res: any) => {
        this.results = res.data;
        this.currentRisk = res.riskLevel || 'Medium'; // Ambil risk level dari API
        this.isAnalyzing = false;
      },
      error: (err) => {
        alert('Gagal koneksi ke AI. Cek console.');
        console.error(err);
        this.isAnalyzing = false;
      }
    });
  }
}