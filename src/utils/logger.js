const stackTrace = require("stack-trace");

const logger = {
  log: (level, message, metadata = "") => {
    const date = Date.now();
    const timeFormat = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Europe/Oslo",
    }).format(date);
    const coloredLevel = getColorizedLevel(level);
    const codeLocation = getCodeLocation();
    const logEntry = `${timeFormat} [${coloredLevel}]: ${message} ${metadata}  ${codeLocation}`;
    console.log(logEntry);
  },
  info: (message, metadata) => {
    logger.log("info", message, metadata);
  },
  error: (message, metadata) => {
    logger.log("error", message, metadata);
  },
  warn: (message, metadata) => {
    logger.log("warn", message, metadata);
  },
  debug: (message, metadata) => {
    logger.log("debug", message, metadata);
  },
};
const getColorizedLevel = (level) => {
  const colors = {
    info: "\x1b[34mINFO\x1b[0m",
    error: "\x1b[31mERROR\x1b[0m",
    warn: "\x1b[33mWARN\x1b[0m",
    debug: "\x1b[35mDEBUG\x1b[0m",
  };

  return colors[level] || level.toUpperCase();
};
const getCodeLocation = () => {
  const trace = stackTrace.get();
  const callerFrame = trace[3];
  const fileName = callerFrame.getFileName() || "";
  const lineNumber = callerFrame.getLineNumber() || "";
  const functionName = callerFrame.getFunctionName() || "";
  return `${fileName}:${lineNumber} - ${functionName}`;
};
export default logger;
