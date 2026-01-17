import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audit-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-result.html' // Sesuaikan nama file
})
export class AuditResultComponent {
  @Input() data: any[] = [];
  @Input() riskLevel: string = 'Low';

  get riskColorClass() {
    switch (this.riskLevel?.toLowerCase()) {
      case 'high': return 'bg-red-50 text-red-600 border-red-100';
      case 'medium': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    }
}
}