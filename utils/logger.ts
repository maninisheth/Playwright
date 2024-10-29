import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';

const logFiles = ['logs/test.log', 'logs/error.log'];
logFiles.forEach((file) => {
  const filePath = path.resolve(file);
  if (fs.existsSync(filePath)) {
    fs.truncateSync(filePath, 0); 
  }
});

const logger = createLogger({
  level: 'info', 
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
  ),
  transports: [
    new transports.File({
      filename: 'logs/test.log',
      level: 'info',
      tailable: true
    }), 
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      tailable: true
    }) 
  ],
});

export default logger;