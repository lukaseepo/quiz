import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  list: any[] = [];
  i: any = 0;
  c: any = 1;
  correctAnswer: number = 0;
  showSubmit: boolean = false;
  showNext: boolean = true;
  checked: boolean = false;
  showQuiz: boolean = false;
  showAnswer: boolean = false;
  showOptions: boolean = true;
  showLoading: boolean = false;
  amount: string  = '10';
  category: string  = '';
  difficulty: string = '';

  constructor(private http: QuizService) {}

  ngOnInit(): void {
    if(this.list.length){
      this.check();
    }
  }

  isDisabled() {
    if(this.list.length === 1){
      this.showNext = false;
      this.showSubmit = true;
    }

    if (this.c == this.amount) {
      this.showNext = false;
      this.showSubmit = true;
    }
  }

  nextQues(): void {
    this.c++;
    this.check();
    this.i++;
    this.list[this.i].incorrect_answers[Math.floor(Math.random() * 3)] = this.list[this.i].correct_answer;
    this.isDisabled();
  }

  check(): void {
    let checks: any = document.getElementsByClassName('answer');

    if(checks.length){
      if (
        this.list[this.i].correct_answer ===
        document.querySelector<any>('input[name="answer"]:checked').value
      ) {
        this.correctAnswer++;
      }  
      checks[0].checked = true;
    }
  }

  endQuiz() {
    if (
      this.list[this.i].correct_answer ===
      document.querySelector<any>('input[name="answer"]:checked').value
    ) {
      this.correctAnswer++;
    }
    this.showQuiz = false;
    this.showAnswer = true;
  }

  startNewQuiz() {
    this.showAnswer = false;
    this.showOptions = true;
    this.category  = '';
    this.difficulty = '';
    this.amount = '10';
    this.correctAnswer = 0;
    this.showSubmit = false;
    this.showNext = true;
  }

  startQuiz() {
    this.showOptions = false;
    if(this.amount > '50'){
      this.amount = '50';
    }
    this.http.getQuestions(this.amount, this.category, this.difficulty).subscribe((item: any) => {
      this.list = item.results;
      if(this.list.length){
        this.showQuiz = true;
        this.c = 1;
        this.i = 0;
        this.list[this.i].incorrect_answers[Math.floor(Math.random() * 3)] = this.list[this.i].correct_answer;
        this.isDisabled(); 
      }else{
        this.showLoading = true;
      }
    })
  }
}
