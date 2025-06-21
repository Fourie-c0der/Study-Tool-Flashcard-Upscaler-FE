import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { FlashcardDto } from '../../models/flashcard';
import { FlashcardService } from '../../services/flashcard.service';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-flashcard-dashboard',
  imports: [FlashcardComponent, CommonModule, FormsModule],
  templateUrl: './flashcard-dashboard.component.html',
  styleUrl: './flashcard-dashboard.component.css'
})
export class FlashcardDashboardComponent {

  @Output() LoadFlashEvent = new EventEmitter<void>();
  
  public flashCards: FlashcardDto[] = [];

  public showFlashCards: boolean = true;

  public currentScore: number = 0;
  public totalScore: number = 0;

  newQuestion: string = '';
  newAnswer: string = '';
  newOptions: string[] = ['', '', '', ''];

  constructor(private flashCardService: FlashcardService) {}
  
  public ngOnInit() {    
    this.loadFlashCards();
  }

  private loadFlashCards() : void {
     this.flashCardService.getAllFlashCards().subscribe({
      next: (responseData: FlashcardDto[]) => {
        this.flashCards = responseData;
        
        this.currentScore = 0;
        this.totalScore = this.flashCards.length;
        this.LoadFlashEvent.emit(this.loadFlashCards());
      },
      error: (error: any) => {
        console.error('Error fetching flashcards:', error);
      }
    });
  }

  public toggleAddNewFlashCard() : void {
    this.showFlashCards = !this.showFlashCards;
  }

  public saveNewFlashcard() : void {
    if (this.newQuestion && this.newAnswer && this.newOptions.some(option => option !== '')) {
      const newCard: FlashcardDto = {
        question: this.newQuestion,
        answer: this.newAnswer,
        options: this.newOptions.filter(option => option !== ''),
        id: 0
      };
      this.flashCardService.addFlashcard(newCard).subscribe({
        next: (responseData: FlashcardDto) => {
          this.loadFlashCards();
          this.toggleAddNewFlashCard();
          this.resetNewFlashcardForm();
          return responseData;
        },
        error: (error: any) => {
          console.error('Error adding flashcard:', error);
        }
      });
    } else {
      alert('Please fill in the question, answer, and at least one option.');
    }
  }

  private resetNewFlashcardForm() {
    this.newQuestion = '';
    this.newAnswer = '';
    this.newOptions = ['', '', '', ''];
  }
  
  
}

  