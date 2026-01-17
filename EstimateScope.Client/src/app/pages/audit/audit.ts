import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EstimateService } from '../../services/estimate';
import { HeroComponent } from '../../components/hero/hero'; // Kita reuse Hero sebagai Input Form
import { AuditResultComponent } from '../../components/audit-result/audit-result';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, HeroComponent, AuditResultComponent],
  template: `
    <div class="py-12 bg-slate-50 min-h-screen">
      <app-hero 
        [isAnalyzing]="isAnalyzing" 
        (onAnalyze)="handleAnalyze($event)">
      </app-hero>

      <div *ngIf="isAnalyzing" class="max-w-5xl mx-auto px-6 py-10 mt-8">
         <div class="flex items-center justify-center gap-3 mb-6">
            <div class="w-6 h-6 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-red-600 font-bold text-lg animate-pulse">{{ 'AUDIT.BTN_ANALYZING' | translate }}</span>
         </div>
         <div class="space-y-4 animate-pulse">
            <div class="h-8 bg-slate-200 rounded w-1/3 mx-auto"></div>
            <div class="h-64 bg-slate-200 rounded-2xl border border-slate-300"></div>
         </div>
      </div>

      <div class="mt-8">
        <app-audit-result 
          *ngIf="!isAnalyzing && results.length > 0"
          [data]="results"
          [riskLevel]="currentRisk"
          [projectInfo]="lastProjectData"> 
        </app-audit-result>
      </div>
    </div>
  `
})
export class AuditPage {
  private estimateService = inject(EstimateService);
  
  isAnalyzing = false;
  results: any[] = [];
  currentRisk = 'Low';
  lastProjectData: any = {};

  handleAnalyze(formData: any) {
    this.isAnalyzing = true;
    this.lastProjectData = formData;
    this.results = []; // Reset hasil lama

    this.estimateService.analyzeProject(formData).subscribe({
      next: (res: any) => {
        this.results = res.data;
        this.currentRisk = res.riskLevel || 'Low';
        this.isAnalyzing = false;
      },
      error: (err) => {
        console.error(err);
        this.isAnalyzing = false;
        alert('Gagal menghubungi AI. Pastikan Backend .NET jalan!');
      }
    });
  }
}