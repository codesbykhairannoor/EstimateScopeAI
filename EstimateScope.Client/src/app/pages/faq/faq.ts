import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-white min-h-screen">
      <div class="max-w-4xl mx-auto px-6">
        
        <div class="text-center mb-16">
          <h1 class="text-4xl font-bold text-slate-900 mb-4">{{ lang.t().FAQ.TITLE }}</h1>
          <p class="text-slate-500 text-lg">{{ lang.t().FAQ.SUBTITLE }}</p>
        </div>

        <div class="space-y-6">
          <div *ngFor="let item of lang.t().FAQ.ITEMS" class="border border-slate-200 rounded-2xl p-6 hover:border-red-200 hover:bg-red-50/30 transition-all">
            <h3 class="text-lg font-bold text-slate-800 mb-3 flex items-start gap-3">
              <span class="text-red-600">Q.</span> {{ item.q }}
            </h3>
            <p class="text-slate-600 leading-relaxed pl-8">
              {{ item.a }}
            </p>
          </div>
        </div>

        <div class="mt-20 text-center p-8 bg-slate-50 rounded-3xl border border-slate-200">
          <p class="text-slate-500 mb-4">Masih bingung?</p>
          <button class="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-red-600 transition-colors">
            Hubungi Support
          </button>
        </div>

      </div>
    </section>
  `
})
export class FaqPage {
  lang = inject(LangService);
}