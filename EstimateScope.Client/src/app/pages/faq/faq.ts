import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="py-20 px-6 max-w-4xl mx-auto">
      <h2 class="text-4xl font-bold text-center mb-12 text-slate-900">{{ 'FAQ.TITLE' | translate }}</h2>
      
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 class="text-xl font-bold text-red-600 mb-2">{{ 'FAQ.Q1' | translate }}</h3>
          <p class="text-slate-600 leading-relaxed">{{ 'FAQ.A1' | translate }}</p>
        </div>
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 class="text-xl font-bold text-red-600 mb-2">{{ 'FAQ.Q2' | translate }}</h3>
          <p class="text-slate-600 leading-relaxed">{{ 'FAQ.A2' | translate }}</p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 class="text-xl font-bold text-red-600 mb-2">{{ 'FAQ.Q3' | translate }}</h3>
          <p class="text-slate-600 leading-relaxed">{{ 'FAQ.A3' | translate }}</p>
        </div>
      </div>
    </div>
  `
})
export class FaqPage {}