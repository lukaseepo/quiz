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
  amount: any | undefined;
  category: string  = '9';
  difficulty: string = 'easy';

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
    this.category  = '9';
    this.difficulty = 'easy';
    this.correctAnswer = 0;
    this.showSubmit = false;
    this.showNext = true;
  }

  startQuiz() {
    this.showOptions = false;
    this.showLoading = true;
    this.http.getQuestions(this.amount, this.category, this.difficulty).subscribe((item: any) => {
      this.list = item.results;
      this.showLoading = false;
      this.showQuiz = true;
      this.c = 1;
      this.i = 0;
      this.list[this.i].incorrect_answers[Math.floor(Math.random() * 3)] = this.list[this.i].correct_answer;
      this.isDisabled();
      console.log(this.list);
    })
  }
}
