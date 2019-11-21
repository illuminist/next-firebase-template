import * as _ from 'lodash'
import * as glob from 'glob'
import * as admin from 'firebase-admin'
import 'firebase-functions'
import * as path from 'path'

try {
  admin.initializeApp()
} catch (e) {
  /* istanbul ignore next: not called in tests */
  console.error(
    'Caught error initializing app with functions.config():',
    e.message || e, // eslint-disable-line
  )
}

const exporter: any = exports

const requireDefault = (obj: any): any =>
  obj && obj.__esModule ? obj : { default: obj }
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
//

// exports.processUploadFile= requireDefault(require('./processUploadFile')).default
// exports.requestFile= requireDefault(require('./requestFile')).default
// exports.createUser= requireDefault(require('./createUser')).default
// exports.testNotif= requireDefault(require('./testNotif')).default

const functionType = new Set(['corsFunc', 'cloudFunction'])

const files = glob.sync(`${__dirname}/**/*.js`, {
  ignore: ['**/_next/**', '**/node_modules/**', '**/utils/**'],
})

_.forEach(files, (filepath: string) => {
  // eslint-disable-next-line security/detect-non-literal-require
  const inmodule = requireDefault(require(filepath))
  if (functionType.has(_.get(inmodule, 'default.name'))) {
    const filename = path.parse(filepath).name
    const functionName = _.get(inmodule, 'asName', filename)
    _.set(exporter, functionName, inmodule.default)
  }
})

// module.exports.processFile = requireDefault(import('./processFile')).default
// module.exports.processPost = requireDefault(import('./processPost')).default
