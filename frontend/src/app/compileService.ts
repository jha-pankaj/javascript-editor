import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable(
    {
        providedIn:"root"
    }
)
export class CompileService  {
    constructor(private http:HttpClient){

    }

    getCompliledCode(code:string){
      return this.http.post<{ output: string, result: any }>('http://localhost:3000/execute',{code})
    }
}