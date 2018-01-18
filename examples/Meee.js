const ClassDebug = require('../').default

class Meee {
  static whatever(){
    this.debug('debug is here')
    this.debugr('debugr is here')
  }
}

ClassDebug.setup(Meee, 'one')

console.log('debug goes below here')
Meee.debug('testing')
Meee.whatever()
