import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: "root"
})

export class QuizService{
    constructor(private http: HttpClient){}
    
    url:string = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`

    getQuestions(){
        return this.http.get(this.url);
    }
}