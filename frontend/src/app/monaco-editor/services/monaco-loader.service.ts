import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { setupMonacoWorkers } from '../workers/setup-workers';

@Injectable({
  providedIn: 'root'
})
export class MonacoLoaderService {
  private _isLoaded = new BehaviorSubject<boolean>(false);
  isLoaded$ = this._isLoaded.asObservable();

  async initializeMonaco(): Promise<void> {
    if (!this._isLoaded.value) {
      // Initialize Monaco workers
      setupMonacoWorkers();
      
      // Mark as initialized
      this._isLoaded.next(true);
    }
  }
}