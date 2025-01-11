import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as monaco from 'monaco-editor';
import { DEFAULT_EDITOR_OPTIONS } from './monaco-editor.types';
import { MonacoEditorService } from './monaco-editor.service';
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
export class MonacoEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  @Input() code: string = '// Type your code here';
  @Input() language: string = 'typescript';

  private editor!: monaco.editor.IStandaloneCodeEditor ;
  private destroy$ = new Subject<void>();

  constructor(private monacoService: MonacoEditorService) {}
  ngOnInit(): void {

    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: '',
      language: 'javascript',
      theme: 'vs-dark'
    });

    this.setupMonacoWorkers();

    // Attach content change listener
    this.editor.getModel()?.onDidChangeContent((event: monaco.editor.IModelContentChangedEvent) => {
      console.log('Editor content changed:', this.editor.getValue());
    });

  }

  setupMonacoWorkers(): void {
    const workerUrls = {
      'typescript': new URL('node_modules/monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url),
      'json': new URL('node_modules/monaco-editor/esm/vs/language/json/json.worker.js', import.meta.url),
      'css': new URL('node_modules/monaco-editor/esm/vs/language/css/css.worker.js', import.meta.url),
      'html': new URL('node_modules/monaco-editor/esm/vs/language/html/html.worker.js', import.meta.url),
      'default': new URL('node_modules/monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url)
    };
    this.editor.getModel()?.onDidChangeContent(() => {
      console.log('Editor content changed:', this.editor.getValue());
    });
    (self as any).MonacoEnvironment = {
      getWorker(_: string, label: string): Worker {
        const workerUrl = workerUrls[label as keyof typeof workerUrls] || workerUrls.default;
        return new Worker(workerUrl, { type: 'module' });
      }
    };

    this.editor.onDidChangeModelContent((event) => {
      console.log('Model changed:', event);
    });
  }
  ngAfterViewInit() {
   /* this.monacoService.isInitialized$
      .pipe(takeUntil(this.destroy$))
      .subscribe(initialized => {
        if (initialized) {
          this.initMonaco();
        }
      });*/
  }

  private initMonaco() {
    if (!this.editorContainer) {
      throw new Error('Editor container not found');
    }

    this.editor = monaco.editor.create(
      this.editorContainer.nativeElement,
      {
        value: '',
        language: 'javascript',
        theme: 'vs-dark'
      }
    );
   // this.setupMonacoWorkers();

    this.monacoService.registerEditor(this.editor);
    console.log(this.editor?.getValue());
    this.editor.getModel()?.onDidChangeContent((event: monaco.editor.IModelContentChangedEvent) => {
     
      console.log('Editor content changed:', this.editor?.getValue());
    });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    
    if (this.editor) {
      this.monacoService.unregisterEditor(this.editor);
      this.editor.dispose();
    }
  }
}