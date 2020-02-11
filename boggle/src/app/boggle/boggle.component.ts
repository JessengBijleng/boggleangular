import { Component, OnInit } from '@angular/core';
import { Boggle } from '../boggle';
import { BoggleLetter } from '../boggle-letter';
import { BoggleService } from '../boggle.service';
import { FoundwordsComponent } from '../foundwords/foundwords.component';
import { HighscoresComponent } from '../highscores/highscores.component';

@Component({
	selector: 'app-boggle',
	templateUrl: './boggle.component.html',
	styleUrls: ['./boggle.component.css']
})
export class BoggleComponent implements OnInit {
	letters: BoggleLetter[];

    foundWords = []; // FoundWords component 
    scores: Array<number> = []; // Scores component
    endTimer: Date = new Date();
    countDownCalled: boolean =  false;
    submitDisabled: boolean = false;


	boggle: Boggle = {
		board: 'ABCDEFGHIJKLMNOP',
		points: 0,
		errors: '',
		entered: '',
		indexes: []
	};

	boggleLetter : BoggleLetter = {
		order : '',
        value : '',
        disabled: false,
        selected: false
	};
	
	constructor( private boggleService: BoggleService ) {
        this.endTimer.setSeconds(this.endTimer.getSeconds() + 20);
    }

	searchLetters(index: number): BoggleLetter {
		for(var i=0; i<16; i++){
			if( this.letters[i].order == index.toString()){
				return this.letters[i];
			}
		}
		return null;
	}
    
    // Disable letters that are not adjacent to the selected letter
	onSelectLetter( letter : BoggleLetter ){
		if(
			( ! letter.disabled ) || 
			( letter.disabled && letter.selected && this.boggle.entered[ this.boggle.entered.length - 1] == letter.value )
		) {
			this.boggle.errors = "";
			
			if( letter.selected ) { //deselect it
				this.boggle.entered = this.boggle.entered.slice(0,-1);
				this.boggle.indexes.pop();
				letter.selected = false;
			} else {
				this.boggle.entered += letter.value;
				this.boggle.indexes.push(  parseInt(letter.order));
			}
		
			if( this.boggle.entered.length > 0){
				var index = this.boggle.indexes[ this.boggle.indexes.length - 1 ];
				
				this.searchLetters(index).selected = true;
				for(var i=0; i<16; i++){
					this.letters[i].disabled = true;
				}
				
				var enable = [];
				switch(index){
					case 0:  enable.push(1, 4, 5); break;
					case 1:  enable.push(0, 2, 4, 5, 6); break;
					case 2:  enable.push(1, 3, 5, 6, 7); break;
					case 3:  enable.push(2, 6, 7); break;
					case 4:  enable.push(0, 1, 5, 8, 9); break;
					case 5:  enable.push(0, 1, 2, 4, 6, 8, 9, 10); break;
					case 6:  enable.push(1, 2, 3, 5, 7, 9, 10, 11); break;
					case 7:  enable.push(2, 3, 6, 10, 11); break;
					case 8:  enable.push(4, 5, 9, 12, 13); break;
					case 9:  enable.push(4, 5, 6, 8, 10, 12, 13, 14); break;
					case 10: enable.push(5, 6, 7, 9, 11, 13, 14, 15); break;
					case 11: enable.push(6, 7, 10, 14, 15); break;
					case 12: enable.push(8, 9, 13); break;
					case 13: enable.push(8, 9, 10, 12, 14); break;
					case 14: enable.push(9, 10, 11, 13, 15); break;
					case 15: enable.push(10, 11, 14); break;
				}
				
				for(var i=0; i < enable.length; i++){
					if( this.boggle.indexes.indexOf( enable[i]) == -1 ) {
						this.searchLetters( enable[i] ).disabled = false;
					} //only enable items that aren't already selected
				}
				
			} else {
				for(var i=0; i<16; i++){
					this.letters[i].disabled = false;
					this.letters[i].selected = false;
				}
			}
			
			
		} else {
			this.boggle.errors = "The letter '"+ letter.value +"' cannot be selected!" ;
		}
		
	}
    
    // Make request to server to check if the word is valid
	testWord(){
		if( this.boggle.entered.length > 0){
			this.boggleService.checkValidWord( this.boggle.entered )
			.subscribe( (response: any) => {
				if( response.isValid ){
					this.boggle.points += response.score;
					this.boggle.indexes = [];
					for(var i=0; i<16; i++){
						this.letters[i].disabled = false;
						this.letters[i].selected = false;
                    }
                    // Add to found words and clear the input
                    this.addToFoundWords(this.boggle.entered);  
                    this.boggle.entered = "";
				} else {
					this.boggle.errors = "The word '"+ this.boggle.entered + "' is not a valid word!";
				}
			})
		}
    }
    
    // Gets called by the countdown timer. TODO: Countdown timer keeps calling every second after finishing?
    // Game ended; 
    countDownEnded() {
        if(this.countDownCalled == false) {
            this.saveScore(this.boggle.points);
            alert("Your game ended. Your score is: " + this.boggle.points);
            if( confirm("Start new game") ){
                window.location.reload();
            }
        }
        this.submitDisabled = true;
        this.countDownCalled = true;
    }
    
    // Make request to server to save the highscore
	saveScore(score: number){
		if( this.boggle.points > 0) {							
            this.boggleService.addScore( 
                this.boggle.points, 			
            ).subscribe( (response) => {
                console.log(response);
            });
        }
    }
    
    // Get the highest five scores from the server
    getScores() {
        this.boggleService.getScores().subscribe((response : Array<number>) => {
            this.scores = response;
        })
    }

    // Get letters from board
	getLetters(): void {
		this.boggleService.getLetters()
			.subscribe((response: any) => { 
				this.boggle.board = response.board;
								
				var ltrs = [];
				for(var i=0; i<16; i++){
					ltrs.push( {order: i, value: this.boggle.board[i], disabled: false, selected: false } );
				}
				
				this.letters = ltrs;
			});
    }
    
    addToFoundWords(word: string) {
        this.foundWords.push(word);
    }

	ngOnInit() {
        this.getScores();
        this.getLetters();
	}

}
