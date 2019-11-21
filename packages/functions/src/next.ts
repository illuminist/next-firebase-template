import makeNextApp, { DEV } from './utils/makeNextApp'

export default makeNextApp({
  dir: DEV ? '../next' : undefined,
  distDir: DEV ? undefined : 'next',
})
