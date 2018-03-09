
import debugr from 'debug'
const debug = debugr('mh:class-debug')
const noop = function(){}

/** 
 A helper class to manage [debug](https://github.com/visionmedia/debug)
 instances on other classes.

 ```
 ClassDebug.setup(MyClass, 'me:MyClass')
 ``` 
*/
export class ClassDebug {

  // Initialise the class
  static _classInit(){
    /**
     * @namespace ClassDebug
     * @property {string} default_prefix - Set a generic prefix var, so users can subclass in the their app (see {@link ClassDebug.extend})
     * @property {object} debugs - A store for the debugs, so it can be possible to retroactively enable/disable the `noop` after startup. This is to avoid the the `debug` function call overhead.
    */

    this.default_prefix = 'mh'

    this.debugs = {}

    return this
  } 

  /**
   * @description Complete `debug` setup for a Class/module as `prefix:ClassName`
   * @param {Class}  cls - Class to attach `debug` to
   * @param {string} prefix - The `debug` namespace prefix to use
   */
  static setup( cls, prefix ){
    const a_debug = new this( prefix )
    a_debug.attach(cls)
    return a_debug
  }

  /**
   * @description Extend the `ClassDebug` class to include a custom default prefix. This give you a customised class for an external module to use instead of `ClassDebug` 
   * @param {string} debug_ns_prefix - The `debug` namespace prefix to use
   * @param {string} [new_class_name=Debug] - Optional name for the JavaScript class. Defaults to `Debug`
   * @return {Class} The extended `ClassDebug` class
   */
  static extend( debug_ns_prefix, new_class_name = 'Debug' ){
    let classes = {}
    classes[new_class_name] = class extends this {}
    //_Debug.name = name
    classes[new_class_name].default_prefix = debug_ns_prefix
    return classes[new_class_name]
  }

  /**
   * @summary Attach a `debug` to a class
   * @description Attaches a `debug` namespace with the format `prefix:suffix` to a class and it's prototype at `.debug` and `.debugr`.
   * @param {Class}  cls - The Class to attach `debug` to
   * @param {string} ns_prefix - The `debug` namespace prefix
   * @param {string} [ns_suffix=Class] - The `debug` namespace suffix, defaults to the class name
   * @return {object} The namespaced `debug` function
  */
  static attach( cls, ns_prefix, ns_suffix ){

    if ( ns_prefix === undefined || ns_prefix === null ) {
      prefix = this.default_prefix
    }
    if ( ns_suffix === undefined || ns_suffix === null ) {
      ns_suffix = cls.name
    }
    let tag = `${ns_prefix}:${ns_suffix}`
    debug('Attaching debug "%s" to class %s', tag, cls.name)
    let cls_debug = debugr(tag)

    cls.prototype.debugr = cls_debug
    cls.prototype.debug = (cls_debug.enabled) ? cls_debug : noop
    cls.debugr = cls_debug
    cls.debug = (cls_debug.enabled) ? cls_debug : noop
    return this.debugs[tag] = cls_debug
  }

  /**
   * @summary Attach a `debug` to a class instance
   * @description Attach a `debug` namespace to a class instance, with optional `[data]` after the `prefix:suffix`
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
   * @summary Create a debug instance with a set prefix
   * @description The ClassDebug instance manages a fixed prefix for the debug namespaces you want to attach to other classes. 
   * @param {string} prefix - debug namespace prefix
   */
  constructor( prefix ){
    this.prefix = prefix || this.constructor.default_prefix
  }

  /**
   * @summary Attach a debug namespace to a class
   * @description  Attaches a debug namespace of the format `prefix:suffix` to the specified class at `.debug` and `.debugr`.
   * @param {Class}  cls - Class to attach debug to
   * @param {string} suffix - debug namespace suffix, defaults to the class name
   * @return {object} The namespaced debug function
  */
  attach( cls, suffix ){
    return this.constructor.attach(cls, this.prefix, suffix)
  }

  /**
   * Attach a debug namespace to a class instance, with optional `[data]` after the `prefix:suffix`
   *
   * @param {Class}  cls - Class to attach debug to
   * @param {string} data - debug namespace data, defaults to the class name
   * @return {object} The namespaced debug function
  */
  instance( instance, data ){
    return this.constructor.instance(instance, this.prefix, data)
  }

}

ClassDebug._classInit()

