import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';


const routes: Routes = [{
    path: 'quiz',
    component: QuestionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
