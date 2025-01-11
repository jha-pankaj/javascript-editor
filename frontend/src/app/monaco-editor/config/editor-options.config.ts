import { editor } from 'monaco-editor';

export interface MonacoEditorOptions extends editor.IStandaloneEditorConstructionOptions {
  // Add any custom options here
}

export const DEFAULT_EDITOR_OPTIONS: Partial<MonacoEditorOptions> = {
  theme: 'vs-dark',
  automaticLayout: true,
  minimap: {
    enabled: true
  },
  scrollBeyondLastLine: false,
  fontSize: 14,
  lineNumbers: 'on',
  roundedSelection: false,
  scrollbar: {
    useShadows: false,
    verticalHasArrows: false,
    horizontalHasArrows: false,
    vertical: 'visible',
    horizontal: 'visible',
    verticalScrollbarSize: 10,
    horizontalScrollbarSize: 10,
  }
};