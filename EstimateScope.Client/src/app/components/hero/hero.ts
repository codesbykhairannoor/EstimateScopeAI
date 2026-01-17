import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.html'
})
export class HeroComponent {
  @Input() isAnalyzing = false;
  @Output() onAnalyze = new EventEmitter<any>();
  lang = inject(LangService);

  // Model data form
  projectData = {
    description: '',
    projectType: 'Web Development',
    complexity: 'Medium',
    hourlyRate: 25, // Default rate
    duration: '1 Month'
  };

  submitAudit() {
    if (this.projectData.description.trim()) {
      // Kirim object lengkap ke App Component
      this.onAnalyze.emit(this.projectData);
    }
  }
}