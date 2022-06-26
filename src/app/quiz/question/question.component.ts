import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  list: any[] = [];
  i: number = 0;
  correctAnswer: number = 0;
  showSubmit: boolean = false;
  showNext: boolean = true;

  constructor(private http: QuizService) { }
  
  ngOnInit(): void {
    this.getQuestions();
    this.isDisabled();
    this.uncheck();
  }

  isDisabled(){

    if(this.i === 9){
      this.showNext = false;
      this.showSubmit = true;
    }
  }

  getQuestions(): void{
    this.http.getQuestions().subscribe((item: any) => {
      this.list = item.results;
      console.log(this.list)
      this.nextQues();
      this.i--;
    })
  }

  nextQues(): void{
    this.list[this.i].incorrect_answers[Math.floor(Math.random() * 3)] = this.list[this.i].correct_answer;
    this.uncheck();
    this.i++;
    this.list[this.i].incorrect_answers[Math.floor(Math.random() * 3)] = this.list[this.i].correct_answer;
    this.isDisabled();
  }

  uncheck(): void{
    let checks:any = document.getElementsByClassName('answer');

    if(this.list[this.i].correct_answer === document.querySelector<any>('input[name="answer"]:checked').value){
      this.correctAnswer++;
    }  

   

    for(let i = 0; i < checks.length; i++){
      checks[i].checked = false;
    }
  }
}
