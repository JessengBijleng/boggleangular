import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-foundwords',
  templateUrl: './foundwords.component.html',
  styleUrls: ['./foundwords.component.css']
})
export class FoundwordsComponent implements OnInit {
    @Input() foundWords: string;
    
    constructor() { }

    ngOnInit() {
    }

}
