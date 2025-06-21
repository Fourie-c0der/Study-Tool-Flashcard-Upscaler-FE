import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlashcardDto } from '../../models/flashcard';
import { FlashcardService } from '../../services/flashcard.service';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {

  @Input() public flashCard!: FlashcardDto;

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

  constructor(private flashcardService: FlashcardService) {}

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
