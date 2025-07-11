import { Injectable } from "@angular/core";
import { ILogger } from "../ILogger";

@Injectable({
  providedIn: 'root'
})
export class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(message);
  }
  
  logInformation = (message: string): void => this.log(`Info: ${message}`);
   
  logWarning = (message: string): void => this.log(`Warn: ${message}`);
  
  logError = (message: string): void => this.log(`Error: ${message}`);

}