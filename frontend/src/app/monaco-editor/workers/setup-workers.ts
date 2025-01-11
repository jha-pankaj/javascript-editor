export function setupMonacoWorkers(): void {
  (self as any).MonacoEnvironment = {
    getWorker(_:any, label: string) {
      const getWorkerUrl = (moduleId: string, label: string) => {
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
      };

      return new Worker(getWorkerUrl('', label), {
        type: 'module',
        name: label
      });
    }
  };
}
