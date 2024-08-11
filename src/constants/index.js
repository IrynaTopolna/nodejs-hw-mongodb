import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const ACCESS_TOKEN_TTL = 15 * 60 * 1000; // 15 minutes in mSec
export const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60 * 1000; //30 days in mSec

export const SMTP = {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: Number(process.env.SMTP_PORT),
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_FROM: process.env.SMTP_FROM,
};

export const TEMPLATE_DIR = path.resolve('src', 'templates');
