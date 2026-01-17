import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-slate-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-6 text-center">
        
        <h1 class="text-4xl font-bold text-slate-900 mb-4">{{ lang.t().PRICING.TITLE }}</h1>
        <p class="text-slate-500 mb-16 text-lg">{{ lang.t().PRICING.SUBTITLE }}</p>

        <div class="grid md:grid-cols-3 gap-8 items-start">
          <div *ngFor="let plan of lang.t().PRICING.PLANS; let i = index" 
            [class.border-red-500]="i === 1" 
            [class.border-2]="i === 1"
            [class.scale-105]="i === 1"
            [class.shadow-2xl]="i === 1"
            [class.shadow-red-200]="i === 1"
            class="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg relative transition-all">
            
            <div *ngIf="i === 1" class="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Best Value
            </div>

            <h3 class="text-xl font-bold text-slate-900 mb-2">{{ plan.name }}</h3>
            <div class="text-4xl font-black text-slate-900 mb-4">{{ plan.price }}</div>
            <p class="text-slate-500 mb-8 h-10">{{ plan.desc }}</p>

            <ul class="space-y-4 mb-8 text-left">
              <li *ngFor="let feature of plan.features" class="flex items-center gap-3 text-slate-600">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="text-sm font-medium">{{ feature }}</span>
              </li>
            </ul>

            <button 
              [class.bg-red-600]="i === 1"
              [class.text-white]="i === 1"
              [class.bg-slate-100]="i !== 1"
              [class.text-slate-700]="i !== 1"
              class="w-full py-3 rounded-xl font-bold transition-colors hover:bg-slate-800 hover:text-white">
              {{ plan.btn }}
            </button>
          </div>
        </div>

      </div>
    </section>
  `
})
export class PricingPage {
  lang = inject(LangService);
}