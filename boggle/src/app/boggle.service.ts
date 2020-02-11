import { Injectable } from '@angular/core';
import { Boggle } from './boggle';
import { BoggleLetter } from './boggle-letter';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BoggleService {

	private ApiURL = 'https://localhost:5001/boggle';
	// /highscore (POST/GET), /checkword?word=X (GET), /newboard (GET)
	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	getLetters() : Observable<Object> {
        return this.http.get(this.ApiURL + '/newBoard');
	}
	
	checkValidWord( word: string ) : Observable<Object> {
		return this.http.get(this.ApiURL + '/checkWord?word=' + word.toLowerCase());
	}
	
	addHighscore( score: number ): Observable<Object> {
		return this.http.get(this.ApiURL + '/addScore?score=' + score);
    }
    
    getScores(): Observable<Object> {
		return this.http.get(this.ApiURL + '/getScores');
	}
	
	constructor(
		private http: HttpClient
	) { }

}
