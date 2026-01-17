import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.html'
})
export class HeroComponent {
  @Input() isAnalyzing = false;
  @Output() onAnalyze = new EventEmitter<any>();

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