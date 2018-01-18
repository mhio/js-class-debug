
import debugr from 'debug'
const debug = debugr('mh:class-debug')
const noop = function(){}


export default class ClassDebug {

  static classInit(){
    // Set a generic prefix undefined
    this.default_prefix = 'mh'

    // Create a store for debugs, so it can be possible to retroactively 
    // enable/disable the noop to avoid after startup. 
    // This is to avoid the the `debug` function call overhead
    this.debugs = {}
  } 

  // Complete setup for a module
  static setup( cls, prefix ){
    const _Debug = new this( prefix )
    _Debug.attach(cls)
    return _Debug
  }

  // Extend this class to include a custom prefix for a module
  static extend( prefix, name = 'Debug' ){
    let classes = {}
    classes[name] = class extends this {}
    //_Debug.name = name
    classes[name].default_prefix = prefix
    return classes[name]
  }

  // Attach debug to a class
  static attach( cls, prefix, suffix ){

    if ( prefix === undefined || prefix === null ) {
      prefix = this.default_prefix
    }
    if ( suffix === undefined || suffix === null ) {
      suffix = cls.name
    }
    let tag = `${prefix}:${suffix}`
    debug('Attaching debug "%s" to class %s', tag, cls.name)
    let cls_debug = debugr(tag)

    cls.prototype.debugr = cls_debug
    cls.prototype.debug = (cls_debug.enabled) ? cls_debug : noop
    cls.debugr = cls_debug
    cls.debug = (cls_debug.enabled) ? cls_debug : noop
    return this.debugs[tag] = cls_debug
  }

  // Attach a debug to a class instance, with optional [data]
  static instance( instance, prefix, data ){
    let cls = instance.constructor
    debug('Attaching debug "%s" to class "%s" instance with data "%s"', prefix, cls.name, data)

    prefix = prefix || this.default_prefix
    let tag = `${prefix}:${cls.name}`
    if (data) tag += `[${data}]`

    let cls_debug = debugr(tag)
    instance.debugr = cls_debug
    instance.debug = (cls_debug.enabled) ? cls_debug : noop
    return this.debugs[tag] = cls_debug
  }

  
  // Create a debug instance with a set prefix
  constructor( prefix ){
    this.prefix = prefix || this.constructor.default_prefix
  }

  // Attach this debug to a class
  attach( cls ){
    return this.constructor.attach(cls, this.prefix)
    
  }

  // Attach this debug to a class instance, with optional [data]
  instance( instance, data ){
    return this.constructor.instance(instance, this.prefix, data)
  }

}

ClassDebug.classInit()
