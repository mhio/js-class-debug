ClassDebug
----------

## Install

```
yarn add @mhio/class-debug
npm install @mhio/class-debug
```

## Usage

[API Docs](doc/API.md)

```
import { ClassDebug } from '@mhio/class-debug'

class Meee {
  static whatever(){
    this.debug('debug is here')
    this.debugr('debugr is here')
  }
}

// This is the bit you will need to do in code
ClassDebug.setup(Meee, 'one')

// Then you end up with `.debug()` attached to the class
console.log('debug goes below here')
Meee.debug('testing')
Meee.whatever()

// and the prototype
let meee = new Meee()
meee.debug('test instance')
```

Then run the example
```
→ DEBUG='one:*' node examples/Meee.js 
debug goes below here
  one:Meee testing +0ms
  one:Meee debug is here +1ms
  one:Meee debugr is here +0ms
```
