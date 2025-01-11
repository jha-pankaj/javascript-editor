import { Injectable, OnDestroy } from '@angular/core';
import * as monaco from 'monaco-editor';

@Injectable({
  providedIn: 'root'
})
export class EditorInstanceService implements OnDestroy {
  private editorInstances: monaco.editor.IStandaloneCodeEditor[] = [];

  registerEditor(editor: monaco.editor.IStandaloneCodeEditor): void {
    this.editorInstances.push(editor);
  }

  unregisterEditor(editor: monaco.editor.IStandaloneCodeEditor): void {
    const index = this.editorInstances.indexOf(editor);
    if (index !== -1) {
      this.editorInstances.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.editorInstances.forEach(editor => editor.dispose());
    this.editorInstances = [];
  }
}