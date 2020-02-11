import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent implements OnInit {
    constructor() { }

    @Input() scores: string;

    ngOnInit() {
    }

}
