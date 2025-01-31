import { format } from "date-fns";

export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`[INFO] ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN] ${message}`, ...args);
  }
};

export const log = (message: string, context: any = {}) => {
    console.log(`[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}] ${message}`, context);
};