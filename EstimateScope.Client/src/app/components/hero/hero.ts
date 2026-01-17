import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  @Input() isAnalyzing = false; // Menerima status loading dari induk
  @Output() onAnalyze = new EventEmitter<string>(); // Mengirim request ke induk

  description: string = '';

  submitAudit() {
    if (this.description.trim()) {
      this.onAnalyze.emit(this.description);
    }
  }
}