const { createLogger, format, transports } = require('winston');
const { join } = require('path');
const os = require('os');

// Log dosyası yolu
const logFilePath = join(__dirname, '../logs', 'access.log');

// Logger yapılandırması
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      const date = new Date();
      const month = date.toLocaleString('en-US', { month: 'short' });
      const day = date.getDate().toString().padStart(2, '0');
      const time = date.toTimeString().split(' ')[0];
      const hostname = os.hostname();
      const programName = 'express-api';
      const pid = process.pid;
      const logLevel = level.toUpperCase();

      return `${month} ${day} ${time} ${hostname} ${programName} [${pid}]: ${timestamp}, ${logLevel} ${message}`;
    })
  ),
  transports: [
    new transports.File({ filename: logFilePath })
  ]
});

module.exports = logger;
