import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as monaco from 'monaco-editor';
import { DEFAULT_EDITOR_OPTIONS } from '../config/editor-options.config';
import { MonacoLoaderService } from '../services/monaco-loader.service';
import { EditorInstanceService } from '../services/editor-instance.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-monaco-editor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #editorContainer class="editor-container"></div>
  `,
  styleUrls: ['./monaco-editor.styles.css']
})
export class MonacoEditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  @Input() code: string = '// Type your code here';
  @Input() language: string = 'typescript';
  @Output() changed = new EventEmitter<string>();

  private editor!: monaco.editor.IStandaloneCodeEditor; 
  private destroy$ = new Subject<void>();

  constructor(
    private monacoLoader: MonacoLoaderService,
    private editorInstance: EditorInstanceService
  ) {}

  ngAfterViewInit() {
    this.monacoLoader.initializeMonaco().then(() => {
      this.monacoLoader.isLoaded$
        .pipe(takeUntil(this.destroy$))
        .subscribe(loaded => {
          if (loaded) {
            this.initEditor();
          }
        });
    });
  }

  private initEditor() {
    if (!this.editorContainer) {
      throw new Error('Editor container not found');
    }

    this.editor = monaco.editor.create(
      this.editorContainer.nativeElement,
      {
        ...DEFAULT_EDITOR_OPTIONS,
        value: this.code,
        language: this.language,
      }
    );

    this.editorInstance.registerEditor(this.editor);
    this.editor.getModel()?.onDidChangeContent(() => {
     console.log('Editor content changed:', this.editor.getValue());
      this.changed.emit(this.editor.getValue())
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    
    if (this.editor) {
      this.editorInstance.unregisterEditor(this.editor);
      this.editor.dispose();
    }
  }
}