import { json } from 'express';
import winston, { Logger } from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

export const winstonLogger = (elasticSearchNodeUrl: string, name: string, level: string): Logger => {
  const options = {
    console: {
      level,
      handleExceptions: true,
      json: false,
      colorize: true
    },
    elasticsearch: {
      level,
      clientOpts: {
        node: elasticSearchNodeUrl,
        log: level,
        maxRetries: 2,
        requestTimeout: 10000,
        sniffOnStart: false
      }
    }
  };

  const esTransport: ElasticsearchTransport = new ElasticsearchTransport({ ...options.elasticsearch, apm: null as any });

  const logger: Logger = winston.createLogger({
    transports: [
      new winston.transports.Console(options.console),
      esTransport
    ],
    exitOnError: false,
    defaultMeta: { service: name }
  });

  return logger;
};