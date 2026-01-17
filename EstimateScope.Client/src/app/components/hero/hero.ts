import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.html' // Sesuaikan nama file
})
export class HeroComponent {
  @Input() isAnalyzing = false;
  @Output() onAnalyze = new EventEmitter<string>();

  description: string = '';

  submitAudit() {
    if (this.description.trim()) {
      this.onAnalyze.emit(this.description);
    }
  }
}