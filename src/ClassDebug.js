
import debugr from 'debug'
const debug = debugr('mh:class-debug')
const noop = function(){}

/** Class to manage debug on other classes */
export class ClassDebug {

  /** 
   * Initialise the class
   */
  static classInit(){
    // Set a generic prefix var, so users can subclass in the their app (see `ClassDebug.extend()`)
    this.default_prefix = 'mh'

    // Create a store for debugs, so it can be possible to retroactively 
    // enable/disable the noop to avoid after startup. 
    // This is to avoid the the `debug` function call overhead
    this.debugs = {}

    return this
  } 

  /**
   * Complete setup for a module

   * @param {Class}  cls - Class to attach debug to
   * @param {string} prefix - debug namespace prefix
   */
  static setup( cls, prefix ){
    const a_debug = new this( prefix )
    a_debug.attach(cls)
    return a_debug
  }

  /**
   * Extend this class to include a custom prefix for an external
   * module to use. 

   * @param {string} prefix - debug namespace prefix
   * @param {string} name - Javascript name of the class
   * @return {Class} The extended ClassDebug class
   */
  static extend( prefix, name = 'Debug' ){
    let classes = {}
    classes[name] = class extends this {}
    //_Debug.name = name
    classes[name].default_prefix = prefix
    return classes[name]
  }

  /**
   * @description Attach a debug namespace to a class
   * @param {Class}  cls - Class to attach debug to
   * @param {string} prefix - debug namespace prefix
   * @param {string} suffix - debug namespace suffix, defaults to the class name
   * @return {object} The namespaced debug function
  */
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

  /**
   * @description Attach a debug to a class instance, with optional `[data]` after the `prefix:suffix`
   * @param {object} instance - A class instance to attach debug to
   * @param {string} prefix - debug namespace prefix
   * @param {string} data - debug namespace data (after suffix)
   * @return {object} The namespaced debug function
   */
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

  
  /**
   * Create a debug instance with a set prefix

   * @param {string} prefix - debug namespace prefix
   */
  constructor( prefix ){
    this.prefix = prefix || this.constructor.default_prefix
  }

  /**
   * Attach a debug namespace to a class: `prefix:suffix`
   *
   * @param {Class}  cls - Class to attach debug to
   * @param {string} suffix - debug namespace suffix, defaults to the class name
   * @return {object} The namespaced debug function
  */
  attach( cls, suffix ){
    return this.constructor.attach(cls, this.prefix, suffix)
  }

  /**
   * Attach a debug namespace to a class instance, with optional: `prefix:suffix[data]`
   *
   * @param {Class}  cls - Class to attach debug to
   * @param {string} data - debug namespace data, defaults to the class name
   * @return {object} The namespaced debug function
  */
  instance( instance, data ){
    return this.constructor.instance(instance, this.prefix, data)
  }

}

ClassDebug.classInit()

export default ClassDebug