import type { App } from 'vue';

/**
 * Configure Vue error handling function
 */

function vueErrorHandler(err: Error, vm: unknown, info: string) {
  console.warn(err, vm, info);
}

/**
 * Configure script error handling function
 */
function scriptErrorHandler(
  event: Event | string,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: Error
) {
  console.log(event, source, lineno, colno, error);
}

function asyncErrorHandler(event: Event) {
  console.log(event);
}

export default class ErrorPlugin {
  static init(app: App): void {
    // Vue exception monitoring;
    app.config.errorHandler = vueErrorHandler;

    // script error
    window.onerror = scriptErrorHandler;

    // 异步错误
    window.addEventListener('unhandledrejection', asyncErrorHandler);
  }
}
