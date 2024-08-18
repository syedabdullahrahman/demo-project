import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root'
})
export class MockTutorialService {

  private tutorials: Tutorial[] = [
    { id: "1", title: 'Tutorial 1', description: 'Description 1', published: true },
    { id: "2", title: 'Tutorial 2', description: 'Description 2', published: false },
    { id: "3", title: 'Tutorial 3', description: 'Description 3', published: true }
  ];

  constructor() { }

  getAll(): Observable<Tutorial[]> {
    return of(this.tutorials);
  }

  get(id: any): Observable<Tutorial | null> {
    debugger
    const tutorial = this.tutorials.find(t => t.id === id);
    return of(tutorial || null);
  }

  create(data: Tutorial): Observable<Tutorial> {
    const newTutorial = { ...data, id: String(this.tutorials.length + 1) };
    this.tutorials.push(newTutorial);
    return of(newTutorial);
  }

  update(id: any, data: Tutorial): Observable<Tutorial | null> {
    const index = this.tutorials.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tutorials[index] = { ...this.tutorials[index], ...data };
      return of(this.tutorials[index]);
    }
    return of(null);
  }

  delete(id: any): Observable<void> {
    this.tutorials = this.tutorials.filter(t => t.id !== id);
    return of(undefined);
  }

  deleteAll(): Observable<void> {
    this.tutorials = [];
    return of(undefined);
  }

  findByTitle(title: string): Observable<Tutorial[]> {
    const results = this.tutorials.filter(t => t.title!.includes(title));
    return of(results);
  }
}
