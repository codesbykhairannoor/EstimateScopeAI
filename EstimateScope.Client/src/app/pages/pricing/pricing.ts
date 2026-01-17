import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="py-20 px-6 max-w-7xl mx-auto text-center">
      <h2 class="text-4xl font-bold text-slate-900 mb-4">{{ 'PRICING.TITLE' | translate }}</h2>
      <p class="text-slate-600 mb-12 text-xl">{{ 'PRICING.SUBTITLE' | translate }}</p>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all relative overflow-hidden">
           <div class="absolute top-0 left-0 w-full h-2 bg-slate-400"></div>
           <h3 class="text-2xl font-bold mb-2">{{ 'PRICING.FREE_PLAN' | translate }}</h3>
           <p class="text-4xl font-black text-slate-900 mb-6">$0<span class="text-sm font-normal text-slate-500">/mo</span></p>
           <button (click)="alert()" class="w-full py-3 rounded-xl border-2 border-slate-200 font-bold hover:bg-slate-50 transition-colors">{{ 'PRICING.BTN_SUBSCRIBE' | translate }}</button>
        </div>

        <div class="bg-white p-8 rounded-2xl border-2 border-red-600 shadow-2xl relative transform scale-105 z-10">
           <div class="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
           <h3 class="text-2xl font-bold mb-2 text-red-600">{{ 'PRICING.PRO_PLAN' | translate }}</h3>
           <p class="text-4xl font-black text-slate-900 mb-6">$19<span class="text-sm font-normal text-slate-500">/mo</span></p>
           <button (click)="alert()" class="w-full py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-colors">{{ 'PRICING.BTN_SUBSCRIBE' | translate }}</button>
        </div>

        <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all relative overflow-hidden">
           <div class="absolute top-0 left-0 w-full h-2 bg-slate-900"></div>
           <h3 class="text-2xl font-bold mb-2">{{ 'PRICING.ENT_PLAN' | translate }}</h3>
           <p class="text-4xl font-black text-slate-900 mb-6">Custom</p>
           <button (click)="alert()" class="w-full py-3 rounded-xl border-2 border-slate-200 font-bold hover:bg-slate-50 transition-colors">{{ 'PRICING.BTN_SUBSCRIBE' | translate }}</button>
        </div>
      </div>
    </div>
  `
})
export class PricingPage {
  constructor(private translate: TranslateService) {}
  alert() { 
    // Ambil pesan alert dari JSON biar sesuai bahasa
    alert(this.translate.instant('PRICING.ALERT_MSG')); 
  }
}