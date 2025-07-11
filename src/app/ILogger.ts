import { Inject, InjectionToken } from "@angular/core";

export interface ILogger {
  log(message: string): void;
  logInformation(message: string): void;
  logWarning(message: string): void;
  logError(message: string): void;
}

export const LOGGER_TOKEN = new InjectionToken<ILogger>('ILogger');