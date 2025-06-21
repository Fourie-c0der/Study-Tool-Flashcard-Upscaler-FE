import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlashcardService } from '../../services/flashcard.service';
import { FlashcardDashboardComponent } from '../flashcard-dashboard/flashcard-dashboard.component';

import { Output, EventEmitter } from '@angular/core';
import { FlashcardDto } from '../../models/flashcard';

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
//to help me edit
  isEditing = false;
  editModel: FlashcardDto = {
    id: 0,
    question: '',
    answer: '',
    options: []
  };


  submitAnswer() {
    this.isFlipped = true;
  }

  flipBack() {
    this.isFlipped = false;
    this.selectedOption = null;
  }

  editFlashcard() {
    this.isEditing = true;
    this.editModel = { ...this.flashCard };
  }

  cancelEdit() {
    this.isEditing = false;
  }

    saveEdit() {
    const { question, answer, options } = this.editModel;

    if (!question.trim() || !answer.trim() || options.some(opt => !opt.trim())) {
      alert('All fields are required and cannot be empty.');
      return;
    }

    this.flashcardService.updateFlashcard(this.editModel.id, this.editModel).subscribe({
      next: () => {
        Object.assign(this.flashCard, this.editModel);
        this.isEditing = false;
      },
      error: err => console.error('Error while updating flashcard', err)
    });
  }
}
