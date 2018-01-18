
import debugr from 'debug'
const debug = debugr('mh:class-debug')
const noop = function(){}


export default class ClassDebug {

  static classInit(){
    this.default_prefix = 'mh'
  } 

  // Complete setup for a module
  static setup( cls, prefix ){
    const _Debug = this.extend( prefix )
    _Debug.attach(cls)
    return _Debug
  }

  // Extend this class to include a custom prefix for a module
  static extend( prefix, name = 'Debug' ){
    const _Debug = class extends this {}
    _Debug.name = name
    _Debug.default_prefix = prefix
    return _Debug
  }

  // Attach debug to a class
  static attach( prefix, cls ){
    debug('Attaching debug to class %s', cls.name)

    prefix = prefix || this.default_prefix
    let tag = `${prefix}:${cls.name}`
    let cls_debug = debugr(tag)
    if (!debug.enabled) cls_debug = noop

    cls.prototype.debugr = cls_debug
    cls.prototype.debug = (cls_debug.enabled) ? cls.debugr : noop
    cls.debugr = cls_debug
    cls.debug = (cls_debug.enabled) ? cls.debugr : noop
  }

  // Attach a debug to a class instance, with optional [data]
  static instance( prefix, instance, data ){
    let cls = instance.constructor
    debug('Attaching debug to class %s instance %s', cls.name, data)

    prefix = prefix || this.default_prefix
    let tag = `${prefix}:${cls.name}`
    if (data) tag += `[${data}]`

    instance.debugr = debugr(tag)
    instance.debug = (debug.enabled) ? instance.debugr : noop
  }

  
  // Create a debug instance with a set prefix
  constructor( prefix ){
    this.prefix = prefix
  }

  // Attach this debug to a class
  attach( cls ){
    return this.constructor.attach(this.prefix, cls)
  }

  // Attach this debug to a class instance, with optional [data]
  instance( instance, data ){
    return this.constructor.instance(this.prefix, instance, data)
  }

}

ClassDebug.classInit()
