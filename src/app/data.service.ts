// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entidades } from './entidades';
import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
// import { _throw as throwError } from 'rxjs/observable/throw';

// @Injectable({providedIn: 'root'})

@Injectable()
export class DataService {

  /*
  private goals = new BehaviorSubject<any>(['goal 1', 'goal 2', 'goal 3', 'goal 4']);
  goal = this.goals.asObservable();

  constructor() { }

  changeGoal(goal) {
    this.goals.next(goal);
  }
  */

  // Define API
  // apiURL = 'http://localhost:10010';

  apiURL = 'https://upheld-castle-251021.appspot.com';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getEntidades(): Observable<Entidades> {
    return this.http.get<Entidades>(this.apiURL + '/entidades').pipe(retry(1), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);

    return throwError(errorMessage);
  }
}
