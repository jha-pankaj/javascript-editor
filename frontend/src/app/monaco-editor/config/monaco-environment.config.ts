// Configuration for Monaco Editor environment
export const monacoEnvironmentConfig = {
  getWorkerUrl: (moduleId: string, label: string): string => {
    switch (label) {
      case 'typescript':
      case 'javascript':
        return '/assets/monaco/vs/language/typescript/ts.worker.js';
      case 'json':
        return '/assets/monaco/vs/language/json/json.worker.js';
      case 'css':
      case 'scss':
      case 'less':
        return '/assets/monaco/vs/language/css/css.worker.js';
      case 'html':
        return '/assets/monaco/vs/language/html/html.worker.js';
      default:
        return '/assets/monaco/vs/editor/editor.worker.js';
    }
  }
};