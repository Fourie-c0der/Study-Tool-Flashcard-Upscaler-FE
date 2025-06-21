import { Component } from '@angular/core';
import { FlashcardDashboardComponent } from '../flashcard-dashboard/flashcard-dashboard.component';
import { NotesDashboardComponent } from '../notes-dashboard/notes-dashboard.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [FlashcardDashboardComponent, NotesDashboardComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public showFlashCards: boolean = true;
  public showNotes: boolean = true;

  selectedButton: string = '';

  setActive(buttonId: string) {
    this.selectedButton = buttonId;
  }

  public showFlashCardsDashboard(): void {
    this.showNotes = false;
    this.showFlashCards = true;
    console.log(this.showFlashCards+ " cards show")
  }

  public showNotesDashboard(): void {
    this.showFlashCards = false;
    this.showNotes = true;
    console.log(this.showNotes+ " notes show")
  }
}
