import { ConsoleLogger } from "./console-logger";

describe("ConsoleLogger", () => {
  let consoleLogger: ConsoleLogger;
  let mockConsole: jasmine.Spy;
  
  beforeEach(() => {
    consoleLogger = new ConsoleLogger();
    mockConsole = spyOn(console, "log");
  });
  
  it("should log a message", () => {
    const message = "Test message";   
    consoleLogger.log(message);    
    expect(mockConsole).toHaveBeenCalledWith(message);
  });

  it("should log an information message", () => {
    const message = "Info message";
    consoleLogger.logInformation(message);
    expect(mockConsole).toHaveBeenCalledWith(`Info: ${message}`);
  });

  it("should log a warning message", () => {
    const message = "Warning message";
    consoleLogger.logWarning(message);
    expect(mockConsole).toHaveBeenCalledWith(`Warn: ${message}`);
  });

  it("should log an error message", () => {
    const message = "Error message";
    consoleLogger.logError(message);
    expect(mockConsole).toHaveBeenCalledWith(`Error: ${message}`);
  });
});