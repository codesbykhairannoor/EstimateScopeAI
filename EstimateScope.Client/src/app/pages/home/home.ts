import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="relative pt-20 pb-32 overflow-hidden bg-slate-50">
      <div class="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full pointer-events-none">
         <div class="absolute top-20 left-10 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
         <div class="absolute top-40 right-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 class="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
          {{ lang.t().HOME.HERO_TITLE_PREFIX }} <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
            {{ lang.t().HOME.HERO_TITLE_SUFFIX }}
          </span>
        </h1>
        <p class="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          {{ lang.t().HOME.HERO_DESC }}
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a routerLink="/audit" class="px-8 py-4 bg-red-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-200 hover:bg-red-700 hover:scale-105 transition-all">
            {{ lang.t().HOME.BTN_PRIMARY }}
          </a>
          <a routerLink="/pricing" class="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
            {{ lang.t().HOME.BTN_SECONDARY }}
          </a>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-16 text-slate-900">{{ lang.t().HOME.FEAT_TITLE }}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div *ngFor="let feat of lang.t().HOME.FEATURES" class="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-red-100 hover:shadow-xl hover:shadow-red-50 transition-all duration-300 group">
            <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-slate-800">{{ feat.title }}</h3>
            <p class="text-slate-500 leading-relaxed">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-slate-900 text-white">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-16">{{ lang.t().HOME.HOW_TITLE }}</h2>
        <div class="grid md:grid-cols-3 gap-12">
          <div *ngFor="let step of lang.t().HOME.STEPS" class="text-center">
            <div class="text-6xl font-black text-slate-800 mb-6">{{ step.step }}</div>
            <h3 class="text-xl font-bold mb-3 text-red-500">{{ step.title }}</h3>
            <p class="text-slate-400 max-w-xs mx-auto">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomePage {
  lang = inject(LangService);
}