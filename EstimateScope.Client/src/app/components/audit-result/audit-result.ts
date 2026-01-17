import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import library PDF
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-audit-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-result.html'
})
export class AuditResultComponent {
  @Input() data: any[] = [];
  @Input() riskLevel: string = 'Low';
  @Input() projectInfo: any = {}; 

  // Fungsi penentu warna badge
  get riskColorClass() {
    switch (this.riskLevel?.toLowerCase()) {
      case 'high': return 'bg-red-50 text-red-600 border-red-100';
      case 'medium': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    }
  }

  // WAJIB ADA: Fungsi yang dipanggil oleh (click)="downloadPDF()" di HTML
  downloadPDF() {
    const doc = new jsPDF();

    // Header Laporan
    doc.setFontSize(18);
    doc.setTextColor(245, 158, 11); // Warna Amber
    doc.text('EstimateScope AI - Project Audit Report', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Project Type: ${this.projectInfo.projectType || 'N/A'}`, 14, 30);
    doc.text(`Hourly Rate: $${this.projectInfo.hourlyRate || 0}/hr`, 14, 35);
    doc.text(`Risk Level: ${this.riskLevel}`, 14, 40);

    // Data untuk Tabel
    const tableRows = this.data.map(item => [
      item.taskName,
      `${item.estimatedHours}h`,
      `$${item.estimatedCost}`,
      item.outOfScope
    ]);

    // Render Tabel ke PDF
    autoTable(doc, {
      startY: 50,
      head: [['Task Breakdown', 'Hours', 'Est. Cost', 'Out of Scope / Notes']],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [245, 158, 11] }
    });

    // Simpan File
    doc.save(`Audit_${this.projectInfo.projectType || 'Project'}.pdf`);
  }
}