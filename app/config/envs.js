export const __TEST__        = process.env.NODE_ENV === 'test';
export const __DEVELOPMENT__ = process.env.NODE_ENV === 'development';
export const __STAGING__     = process.env.NODE_ENV === 'staging';
export const __PRODUCTION__  = process.env.NODE_ENV === 'production';
export const __ENVIRONMENT__ = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
