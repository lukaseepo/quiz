import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  correct:boolean = false; 
  answer:any = '';
  list:any = [];
  answerSelected:boolean = false;
  correctAnswers:number = 0;
  incorrectAnswers:number = 0;
  constructor(private http: QuizService) { }

  currentQuiz = 0;



  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(){
    this.http.getQuestions().subscribe((item:any)=>{
      for(let i = 0; i<item.results.length; i++){
        item.results[i].incorrect_answers.push(item.results[i].correct_answer);
      }
        this.list = item;
        console.log(item)
    })
  }

  onAnswer(options:any){
    this.answerSelected = true;
    setTimeout(() =>{
      this.currentQuiz++;
      this.answerSelected = false;
    },1000)
    if(options){
      this.correctAnswers++;
    }else if(!options){
      this.incorrectAnswers++;
    }
  }

  


  


}
