import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: "root"
})

export class QuizService{
    constructor(private http: HttpClient){}

    getQuestions(amount:string, category: string, difficulty:string){
        return this.http.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
    }
}