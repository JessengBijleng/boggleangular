import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BoggleComponent } from './boggle/boggle.component';
import { HighscoresComponent } from './highscores/highscores.component';
import { FoundwordsComponent } from './foundwords/foundwords.component';

import { CountdownTimerModule } from 'angular-countdown-timer';

import { BoggleService } from './boggle.service';


@NgModule({
    declarations: [
        AppComponent,
        BoggleComponent,
        HighscoresComponent,
        FoundwordsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        CountdownTimerModule.forRoot()
    ],
    providers: [BoggleService],
    bootstrap: [AppComponent]
})
export class AppModule { }
