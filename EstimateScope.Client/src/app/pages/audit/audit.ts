import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimateService } from '../../services/estimate';
import { LangService } from '../../services/lang.service';
import { LimitService } from '../../services/limit.service'; // <--- Import LimitService
import { HeroComponent } from '../../components/hero/hero'; 
import { AuditResultComponent } from '../../components/audit-result/audit-result';

@Component({
  selector: 'app-audit-page',
  standalone: true,
  imports: [CommonModule, HeroComponent, AuditResultComponent],
  template: `
    <div class="py-12 bg-slate-50 min-h-screen">
      
      <app-hero 
        [isAnalyzing]="isAnalyzing" 
        (onAnalyze)="handleAnalyze($event)">
      </app-hero>

      <div *ngIf="isAnalyzing" class="max-w-5xl mx-auto px-6 py-10 mt-8">
         <div class="flex items-center justify-center gap-3 mb-6">
            <div class="w-6 h-6 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-red-600 font-bold text-lg animate-pulse">
              {{ lang.t().AUDIT_FORM.BTN_LOADING }}
            </span>
         </div>
         <div class="space-y-4 animate-pulse">
            <div class="h-8 bg-red-100 rounded w-1/3 mx-auto"></div>
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
  lang = inject(LangService);
  limit = inject(LimitService); // <--- INJECT DISINI

  isAnalyzing = false;
  results: any[] = [];
  currentRisk = 'Low';
  lastProjectData: any = {};

  handleAnalyze(formData: any) {
    // 1. CEK LIMIT DULU SEBELUM KIRIM KE BACKEND
    if (!this.limit.canAudit()) {
      alert("Jatah limit bulanan Anda (3x) sudah habis! Tunggu bulan depan ya.");
      return;
    }

    this.isAnalyzing = true;
    this.lastProjectData = formData;
    this.results = []; 

    this.estimateService.analyzeProject(formData).subscribe({
      next: (res: any) => {
        console.log('📦 Data Mentah dari Backend:', res);

        let finalData = res;
        if (typeof res === 'string') {
            try {
                finalData = JSON.parse(res);
            } catch (e) {
                console.error("Gagal parsing JSON:", e);
                finalData = { data: [], riskLevel: 'Unknown' };
            }
        }

        this.results = finalData.data || [];
        this.currentRisk = finalData.riskLevel || 'Low';
        this.isAnalyzing = false;

        // 2. POTONG KUOTA HANYA JIKA SUKSES
        this.limit.useCredit(); 
      },
      error: (err) => {
        console.error("🔥 Error Frontend:", err);
        this.isAnalyzing = false;
        alert('Gagal menghubungi AI. Coba lagi nanti.');
      }
    });
  }
}