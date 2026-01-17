import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audit-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-result.component.html'
})
export class AuditResultComponent {
  @Input() data: any[] = [];
  @Input() riskLevel: string = 'Low'; // Default

  // Helper buat warna badge risiko
  get riskColorClass() {
    switch (this.riskLevel?.toLowerCase()) {
      case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  }
}