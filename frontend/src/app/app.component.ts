import { Component } from '@angular/core';
import { MonacoEditorComponent } from './monaco-editor';
import { CompileService } from './compileService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MonacoEditorComponent , CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class App {
  content:string=''
  output:string='';
  error = false;
  initialCode = ``;
constructor(private compileService : CompileService){

}
onChanged(ev:any){
  this.content=ev;
  console.log( this.content);
}

runCode(){
  this.output='';
  this.error = false;
  this.compileService.getCompliledCode(this.content).subscribe((res:any)=>{
   console.log(res?.output);
   this.output=res?.output;
  }
  ,err=>{
    this.error=true;
    console.log(err.error)
    this.output=err.error.error;
  }

)
}


}