import { Injectable, OnDestroy } from '@angular/core';
import { MonacoWorker } from './monaco.worker';
import * as monaco from 'monaco-editor';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonacoEditorService implements OnDestroy {
  private editorInstances: monaco.editor.IStandaloneCodeEditor[] = [];
  private _isInitialized = new BehaviorSubject<boolean>(false);
  isInitialized$ = this._isInitialized.asObservable();

  constructor() {
    this.initializeMonaco();
  }

  private async initializeMonaco(): Promise<void> {
    if (!this._isInitialized.value) {
      MonacoWorker.initialize();
      this._isInitialized.next(true);
    }
  }

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