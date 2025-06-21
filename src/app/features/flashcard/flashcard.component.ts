import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlashcardDto } from '../../models/flashcard';
import { FormsModule } from '@angular/forms';
import { FlashcardService } from '../../services/flashcard.service';
import { FlashcardDashboardComponent } from '../flashcard-dashboard/flashcard-dashboard.component';

@Component({
  selector: 'app-flashcard',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {

  @Input() public flashCard!: FlashcardDto;

  constructor(private flashcardService: FlashcardService, private flashcardDashboardComponent: FlashcardDashboardComponent) { }

  isFlipped = false;
  selectedOption: string | null = null;

  submitAnswer() {
    this.isFlipped = true;
  }

  
  public reload(){
    this.flashcardDashboardComponent.ngOnInit();
  }

  public deleteFlashCard(id: number): void {
    this.flashcardService.deleteFlashcard(id).subscribe({
      next: () => { this.flashcardService.getAllFlashCards();
      this.reload();  
       },
      error: (error: any) => {
        console.error('Error deleting flashcard:', error);
      }
    });
  }


  // flipBack() {
  //   this.isFlipped = false;
  //   this.selectedOption = null;
  // }
}
