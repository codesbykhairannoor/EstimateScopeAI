import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LimitService {
  // Sinyal sisa kuota (Default 3)
  remaining = signal(3);

  constructor() {
    this.checkLocalStorage();
  }

  // Cek LocalStorage saat aplikasi jalan
  checkLocalStorage() {
    const key = this.getStorageKey();
    const used = Number(localStorage.getItem(key) || 0);
    this.remaining.set(Math.max(0, 3 - used));
  }

  // Fungsi untuk mengurangi kuota (dipanggil setelah sukses Audit)
  useCredit() {
    const key = this.getStorageKey();
    const currentUsed = Number(localStorage.getItem(key) || 0);
    
    const newUsed = currentUsed + 1;
    localStorage.setItem(key, newUsed.toString());
    
    // Update sinyal biar Navbar berubah
    this.remaining.set(Math.max(0, 3 - newUsed));
  }

  // Cek apakah masih boleh audit
  canAudit(): boolean {
    return this.remaining() > 0;
  }

  // Key unik per bulan (biar reset tiap ganti bulan)
  private getStorageKey(): string {
    const d = new Date();
    return `usage_${d.getFullYear()}_${d.getMonth()}`;
  }
}