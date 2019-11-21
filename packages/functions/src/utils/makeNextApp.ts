import next from 'next'
// import { functionWithRegion } from '../wrappers'
import * as functions from 'firebase-functions'
// import * as path from 'path'

export const DEV = process.env.NODE_ENV !== 'production'

export const makeNextApp = ({ dir = '.', distDir = '.next' }) => {
  let app: ReturnType<typeof next> | null = null
  return functions.https.onRequest(async (req: any, res: any) => {
    const me = app || (app = next({ dev: DEV, dir, conf: { distDir }}))
    
    const handle = me.getRequestHandler()
    await me.prepare()
    handle(req, res)
  })
}

export default makeNextApp
