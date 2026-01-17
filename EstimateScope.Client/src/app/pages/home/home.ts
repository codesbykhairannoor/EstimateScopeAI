import { Component, inject } from '@angular/core'; // Tambah inject
import { RouterModule } from '@angular/router';
import { LangService } from '../../services/lang.service';
@Component({
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-slate-50">
      
      <h1 class="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
        {{ lang.t().HOME.TITLE_PREFIX }} <br> 
        <span class="text-red-600">{{ lang.t().HOME.TITLE_SUFFIX }}</span>
      </h1>
      
      <p class="text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
        {{ lang.t().HOME.DESC }}
      </p>
      
      <button routerLink="/audit" class="px-8 py-4 bg-red-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-red-200 hover:bg-red-700 hover:scale-105 transition-all">
        {{ lang.t().HOME.BTN }}
      </button>

    </div>
  `
})
export class HomePage {
  // Inject Service biar HTML bisa baca
  lang = inject(LangService);
}