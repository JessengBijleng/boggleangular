import { Component } from '@angular/core';
import { BoggleComponent } from './boggle/boggle.component';
import { FoundwordsComponent } from './foundwords/foundwords.component';
import { HighscoresComponent } from './highscores/highscores.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Boggle';
}
