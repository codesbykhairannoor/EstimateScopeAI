import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  selectedLang = signal<'id' | 'en'>('id');

  // Pakai : any untuk bypass strict typing sementara agar build sukses
  private dictionary: any = {
    id: {
      NAV: { HOME: 'Beranda', AUDIT: 'Mulai Audit', PRICING: 'Harga', FAQ: 'Tanya Jawab', SISA: 'Sisa Kredit AI', FREE: 'Gratis' },
      HOME: {
       HERO_TITLE_PREFIX: 'Estimasi Proyek Berbasis',
HERO_TITLE_SUFFIX: 'AI Tanpa Drama',
        HERO_DESC: 'Jangan biarkan klien mendikte harga sembarangan. Dapatkan hitungan biaya, waktu, dan batasan lingkup yang logis berbasis AI dalam hitungan detik.',
        BTN_PRIMARY: 'Mulai Audit Gratis 🚀',
        BTN_SECONDARY: 'Lihat Contoh',
        FEAT_TITLE: 'Kenapa EstimateScope?',
        FEATURES: [
          { title: 'Akurat & Logis', desc: 'Menggunakan algoritma berbasis pasar standar industri software house.' },
          { title: 'Anti Scope Creep', desc: 'AI akan mendefinisikan apa yang "Out of Scope" biar lu ga dikerjain klien.' },
          { title: 'Format PDF Resmi', desc: 'Download hasil estimasi dalam bentuk PDF profesional siap kirim.' }
        ],
        HOW_TITLE: 'Cara Kerja',
        STEPS: [
          { step: '01', title: 'Input Data', desc: 'Masukkan tipe proyek, tingkat kesulitan, dan rate per jam lu.' },
          { step: '02', title: 'AI Analisis', desc: 'Engine kami memecah fitur dan menghitung jam kerja.' },
          { step: '03', title: 'Download', desc: 'Dapatkan breakdown lengkap dan kirim ke klien.' }
        ]
      },
      PRICING: {
        TITLE: 'Investasi Terbaik',
        SUBTITLE: 'Pilih paket yang cocok buat karir freelancing lu.',
        PLANS: [
          { name: 'Starter', price: 'Gratis', desc: 'Untuk pemula yang baru terjun.', features: ['3x Audit / Hari', 'Ekspor PDF Dasar', 'Support Komunitas'], btn: 'Daftar Sekarang' },
          { name: 'Pro', price: 'Rp 99rb', desc: 'Paling laku buat Freelancer aktif.', features: ['Unlimited Audit', 'Ekspor PDF White-label', 'Analisis Resiko Detail', 'Prioritas Support'], btn: 'Pilih Pro' },
          { name: 'Agency', price: 'Rp 499rb', desc: 'Untuk Software House kecil.', features: ['Multi User', 'API Access', 'Custom Branding', 'Account Manager'], btn: 'Hubungi Kami' }
        ]
      },
      FAQ: {
        TITLE: 'Sering Ditanyakan',
        SUBTITLE: 'Jawaban buat keraguan lu.',
        ITEMS: [
          { q: 'Apakah estimasi ini akurat?', a: 'Sangat. Kami menggunakan data rata-rata industri, tapi tetap sesuaikan dengan skill lu sendiri.' },
          { q: 'Bisa buat proyek apa aja?', a: 'Saat ini optimal untuk Web Dev, Mobile App, dan UI/UX Design.' },
          { q: 'Apa itu "Out of Scope"?', a: 'Itu adalah batasan kerjaan. Misal: Lu bikin Web, tapi gak termasuk bikin Logo atau Video.' },
          { q: 'Gimana cara bayarnya?', a: 'Saat ini masih Beta dan Gratis! Nanti bisa via QRIS.' }
        ]
      },
      AUDIT_RESULT: {
        TITLE: 'Hasil Audit',
        BTN_DOWNLOAD: 'Unduh Laporan PDF',
        COL_TASK: 'Deskripsi Tugas',
        COL_HOURS: 'Jam',
        COL_COST: 'Estimasi Biaya',
        COL_SCOPE: 'Batasan / Di Luar Lingkup'
      },
      AUDIT_FORM: {
        TITLE: 'Project Scope Auditor',
        SUBTITLE: 'Tentukan parameter proyek lu biar estimasinya akurat.',
        LABEL_DOMAIN: 'Tipe Proyek',
        LABEL_COMPLEXITY: 'Tingkat Kesulitan',
        LABEL_RATE: 'Rate Per Jam ($)',
        LABEL_TIMELINE: 'Estimasi Waktu',
        PLACEHOLDER_TIMELINE: 'Contoh: 2 Minggu',
        LABEL_DESC: 'Detail Proyek / Spesifikasi',
        PLACEHOLDER_DESC: 'Jelaskan detailnya...',
        BTN_RUN: 'Jalankan Audit 🚀',
        BTN_LOADING: 'Menganalisis...',
        OPTIONS: {
          WEB: 'Web Development',
          MOBILE: 'Mobile App',
          UIUX: 'UI/UX Design',
          ARCH: 'Arsitektur',
          MVP: 'Simple (MVP)',
          MED: 'Medium (Standard)',
          ENT: 'Complex (Enterprise)'
        }
      }
    },
    en: {
      NAV: { HOME: 'Home', AUDIT: 'Start Audit', PRICING: 'Pricing', FAQ: 'FAQ' , SISA: 'AI Credit Left', FREE: 'Free' },
      HOME: {
       HERO_TITLE_PREFIX: 'AI-Powered Estimation,',
HERO_TITLE_SUFFIX: 'Zero Project Drama',
        HERO_DESC: 'Don’t let clients dictate pricing blindly. Get logical, AI-based cost, time, and scope calculations in seconds.',
        BTN_PRIMARY: 'Start Free Audit 🚀',
        BTN_SECONDARY: 'View Samples',
        FEAT_TITLE: 'Why EstimateScope?',
        FEATURES: [
          { title: 'Accurate & Logical', desc: 'Uses industry-standard algorithms based on software house rates.' },
          { title: 'Anti Scope Creep', desc: 'AI defines what is "Out of Scope" so clients don’t exploit you.' },
          { title: 'Professional PDF', desc: 'Download estimation results as a ready-to-send professional PDF.' }
        ],
        HOW_TITLE: 'How It Works',
        STEPS: [
          { step: '01', title: 'Input Data', desc: 'Enter project type, complexity, and your hourly rate.' },
          { step: '02', title: 'AI Analysis', desc: 'Our engine breaks down features and calculates man-hours.' },
          { step: '03', title: 'Download', desc: 'Get a full breakdown and send it to your client.' }
        ]
      },
      AUDIT_FORM: {
        TITLE: 'Project Scope Auditor',
        SUBTITLE: 'Define your project parameters for accurate estimation.',
        LABEL_DOMAIN: 'Project Domain',
        LABEL_COMPLEXITY: 'Complexity',
        LABEL_RATE: 'Hourly Rate ($)',
        LABEL_TIMELINE: 'Est. Timeline',
        PLACEHOLDER_TIMELINE: 'e.g. 2 Weeks',
        LABEL_DESC: 'Project Details / Requirements',
        PLACEHOLDER_DESC: 'Describe details...',
        BTN_RUN: 'Run Audit 🚀',
        BTN_LOADING: 'Analyzing...',
        OPTIONS: {
          WEB: 'Web Development',
          MOBILE: 'Mobile App',
          UIUX: 'UI/UX Design',
          ARCH: 'Architecture',
          MVP: 'Simple (MVP)',
          MED: 'Medium (Standard)',
          ENT: 'Complex (Enterprise)'
        }
      },
      PRICING: {
        TITLE: 'Best Investment',
        SUBTITLE: 'Choose the plan that fits your freelancing career.',
        PLANS: [
          { name: 'Starter', price: 'Free', desc: 'For beginners.', features: ['3x Audits'], btn: 'Sign Up' },
          { name: 'Pro', price: '$9', desc: 'Best seller.', features: ['Unlimited'], btn: 'Choose Pro' },
          { name: 'Agency', price: '$49', desc: 'For teams.', features: ['Custom'], btn: 'Contact Us' }
        ]
      },
      AUDIT_RESULT: {
        TITLE: 'Audit Results',
        BTN_DOWNLOAD: 'Download PDF Report',
        COL_TASK: 'Task Description',
        COL_HOURS: 'Hours',
        COL_COST: 'Estimated Cost',
        COL_SCOPE: 'Boundaries / Out of Scope'
      },
      FAQ: {
        TITLE: 'Frequently Asked Questions',
        SUBTITLE: 'Answers to your doubts.',
        ITEMS: [
          { q: 'Is it accurate?', a: 'Yes, based on industry averages.' },
          { q: 'Support?', a: 'Optimized for Web, Mobile, and UI/UX.' }
        ]
      }
    }
  };

  t = computed(() => this.dictionary[this.selectedLang()]);

  switchLang(lang: 'id' | 'en') {
    this.selectedLang.set(lang);
  }
}