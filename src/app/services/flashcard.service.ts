import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FlashcardDto } from "../models/flashcard";

@Injectable({
    providedIn: 'root'
})
export class FlashcardService {
    constructor(private http: HttpClient) { }

  private readonly baseUrl = 'http://localhost:5013/api/FlashCard';


    public getAllFlashCards(): Observable<FlashcardDto[]> {
        return this.http.get<FlashcardDto[]>(this.baseUrl);
    }

    public getFlashcard(id: number): Observable<FlashcardDto> {
        return this.http.get<FlashcardDto>(this.baseUrl + '/' + id);
    }

    public addFlashcard(newFlashcard: FlashcardDto): Observable<FlashcardDto> {
        return this.http.post<FlashcardDto>(this.baseUrl, newFlashcard);
    }

    
    public updateFlashcard(id: number, updatedCard: FlashcardDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, updatedCard);
    }

    public deleteFlashcard(id: number): Observable<any> {
        return this.http.delete(this.baseUrl +'/' + id, {
            responseType: 'text'
        });
    }

}

