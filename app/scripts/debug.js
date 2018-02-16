import { createLogger } from './lib/utils/logger'

/**
 * Debug
 */
if (process.env.NODE_ENV === 'development') {
  createLogger('Application', true)
}
