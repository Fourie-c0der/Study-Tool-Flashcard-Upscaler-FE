import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FlashcardDto } from "../models/flashcard";

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  private readonly apiUrl = 'http://localhost:5013/api/FlashCard';

  constructor(private http: HttpClient) {}

  public getAllFlashCards(): Observable<FlashcardDto[]> {
    return this.http.get<FlashcardDto[]>(this.apiUrl);
  }

  public getFlashcard(id: number): Observable<FlashcardDto> {
    return this.http.get<FlashcardDto>(`${this.apiUrl}/${id}`);
  }

  public addFlashcard(newFlashcard: FlashcardDto): Observable<FlashcardDto> {
    return this.http.post<FlashcardDto>(this.apiUrl, newFlashcard);
  }

  public updateFlashcard(id: number, updatedCard: FlashcardDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, updatedCard);
  }

  public deleteFlashcard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
