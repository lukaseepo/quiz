import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { QuestionComponent } from './question/question.component';
import { QuizRoutingModule } from './quiz.routing.module';



@NgModule({
  declarations: [
   QuestionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    QuizRoutingModule,
    FormsModule
  ],
})
export class QuizModule { }

