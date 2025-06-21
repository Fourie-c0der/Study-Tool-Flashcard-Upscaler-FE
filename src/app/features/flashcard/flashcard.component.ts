import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlashcardDto } from '../../models/flashcard';
import { FormsModule } from '@angular/forms';
import { FlashcardService } from '../../services/flashcard.service';
import { FlashcardDashboardComponent } from '../flashcard-dashboard/flashcard-dashboard.component';

import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {

  @Input() public flashCard!: FlashcardDto;


  @Output() refreshRequested = new EventEmitter<void>();

  public deleteFlashCard(id: number): void {
    this.flashcardService.deleteFlashcard(id).subscribe({
      next: () => {
        console.log('Flashcard deleted. Emitting to parent')
        this.refreshRequested.emit();  // Tell parent to reload
      },
      error: (error: any) => {
        console.error('Error deleting flashcard:', error);
      }
    });
  }


  constructor(private flashcardService: FlashcardService) { }



  isFlipped = false;
  selectedOption: string | null = null;

  submitAnswer() {
    this.isFlipped = true;
  }




  // flipBack() {
  //   this.isFlipped = false;
  //   this.selectedOption = null;
  // }
}
