import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root' // Biar bisa dipanggil di mana aja
})
export class LangService {
  // 1. Kita pake Signal biar reaktif (berubah otomatis)
  selectedLang = signal<'id' | 'en'>('id');

  // 2. Kamus Kata-Kata (Tinggal lu tambah di sini nanti)
  private dictionary = {
    id: {
      NAV: {
        HOME: 'Beranda',
        AUDIT: 'Mulai Audit',
        PRICING: 'Harga',
        FAQ: 'Tanya Jawab'
      },
      HOME: {
        TITLE_PREFIX: 'Estimasi Proyek Anda',
        TITLE_SUFFIX: 'Tanpa Drama',
        DESC: 'Alat estimasi berbasis AI untuk developer & freelancer. Dapatkan hitungan biaya, waktu, dan batasan lingkup yang akurat dalam hitungan detik.',
        BTN: 'Mulai Audit Gratis 🚀'
      }
    },
    en: {
      NAV: {
        HOME: 'Home',
        AUDIT: 'Start Audit',
        PRICING: 'Pricing',
        FAQ: 'FAQ'
      },
      HOME: {
        TITLE_PREFIX: 'Estimate Your Project',
        TITLE_SUFFIX: 'Without The Drama',
        DESC: 'AI-powered estimation tool for developers & freelancers. Get accurate cost, time, and scope boundaries in seconds.',
        BTN: 'Start Free Audit 🚀'
      }
    }
  };

  // 3. Cara ngambil teksnya (Computed Signal)
  // Setiap kali selectedLang berubah, 't' akan ikut berubah otomatis
  t = computed(() => this.dictionary[this.selectedLang()]);

  // 4. Fungsi ganti bahasa
  switchLang(lang: 'id' | 'en') {
    this.selectedLang.set(lang);
  }
}