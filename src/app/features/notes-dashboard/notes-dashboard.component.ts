import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteDto } from '../../models/notes';
import { NotesComponent } from "../notes/notes.component";
import { NotesService } from '../../services/note.service';

@Component({
  selector: 'app-notes-dashboard',
  standalone: true,
  imports: [NotesComponent, CommonModule, FormsModule],
  templateUrl: './notes-dashboard.component.html',
  styleUrls: ['./notes-dashboard.component.css']
})
export class NotesDashboardComponent {

  public notes: NoteDto[] = [];
  public showNotes: boolean = true;
  public isEditing: boolean = false;
  public currentNoteId: number | null = null;



  newTopic: string = '';
  newDescription: string = '';
  newKeypoints: string[] = ['', '', '', ''];


  constructor(private noteService: NotesService) { }

  public ngOnInit(): void {
    this.loadNotes();
  }

  private loadNotes(): void {
    this.noteService.getAllNotes().subscribe({
      next: (responseData: NoteDto[]) => {
        this.notes = responseData;
      },
      error: (error: any) => {
        console.error('Error fetching notes:', error);
      }
    });
  }


  public toggleAddNewNote(): void {
    this.showNotes = !this.showNotes;
  }

 public saveNewNote(): void {
  const hasAtLeastOneKeypoint = this.newKeypoints.some(k => k.trim() !== '');
  console.log('Save button clicked');

  if (this.newTopic && this.newDescription && hasAtLeastOneKeypoint) {
    const noteData: NoteDto = {
      id: this.currentNoteId ?? 0,
      topic: this.newTopic,
      description: this.newDescription,
      points: this.newKeypoints.filter(k => k.trim() !== '')
    };

    if (this.currentNoteId !== null) {
      // EDIT note
      this.noteService.updateNote(this.currentNoteId, noteData).subscribe({
        next: () => {
          this.loadNotes();
          this.toggleAddNewNote(); 
          this.resetNewNoteForm(); 
        },
        error: (error: any) => console.error('Error updating note:', error)
      });
    } else {
      // ADD note
      this.noteService.addNote(noteData).subscribe({
        next: () => {
          this.loadNotes();
          this.toggleAddNewNote(); 
          this.resetNewNoteForm(); 
        },
        error: (error: any) => console.error('Error adding note:', error)
      });
    }
  } else {
    alert('Please fill in the topic, description, and at least one key point.');
  }
}

  public deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe({
      next: () => { this.loadNotes(); },
      error: (error: any) => {
        console.error('Error deleting note:', error);
      }
    });
  }

public editNote(id: number): void {
  const noteToEdit = this.notes.find(note => note.id === id);
  if (!noteToEdit) return;

  console.log('Editing note:', noteToEdit); 

  this.currentNoteId = noteToEdit.id;
  this.newTopic = noteToEdit.topic;
  this.newDescription = noteToEdit.description;

  this.newKeypoints = [...noteToEdit.points];
  while (this.newKeypoints.length < 4) {
    this.newKeypoints.push('');
  }

  this.showNotes = false;
  this.isEditing = true;
}

addKeypoint(): void {
  this.newKeypoints.push('');
}

removeKeypoint(index: number): void {
  if (this.newKeypoints.length > 1) {
    this.newKeypoints.splice(index, 1);
  }
}
private resetNewNoteForm(): void {
  this.newTopic = '';
  this.newDescription = '';
  this.newKeypoints = ['', '', '', ''];
  this.currentNoteId = null;
  this.isEditing = false;
}

}


