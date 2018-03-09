'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassDebug = undefined;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug2.default)('mh:class-debug');
const noop = function noop() {};

/** 
 A helper class to manage [debug](https://github.com/visionmedia/debug)
 instances on other classes.

 ```
 ClassDebug.setup(MyClass, 'me:MyClass')
 ``` 
*/
class ClassDebug {

  // Initialise the class
  static _classInit() {
    /**
     * @namespace ClassDebug
     * @property {string} default_prefix - Set a generic prefix var, so users can subclass in the their app (see {@link ClassDebug.extend})
     * @property {object} debugs - A store for the debugs, so it can be possible to retroactively enable/disable the noop after startup. This is to avoid the the `debug` function call overhead
    */

    this.default_prefix = 'mh';

    this.debugs = {};

    return this;
  }

  /**
   * @description Complete setup for a module
   * @param {Class}  cls - Class to attach debug to
   * @param {string} prefix - debug namespace prefix
   */
  static setup(cls, prefix) {
    const a_debug = new this(prefix);
    a_debug.attach(cls);
    return a_debug;
  }

  /**
   * @description Extend this class to include a custom default prefix for an external module to use. 
   * @param {string} prefix - debug namespace prefix
   * @param {string} name - Javascript name of the class
   * @return {Class} The extended ClassDebug class
   */
  static extend(prefix, name = 'Debug') {
    let classes = {};
    classes[name] = class extends this {};
    //_Debug.name = name
    classes[name].default_prefix = prefix;
    return classes[name];
  }

  /**
   * @summary Attach a debug to a class
   * @description Attaches a debug namespace with the format `prefix:suffix` to a class and it's prototype at `.debug` and `.debugr`.
   * @param {Class}  cls - Class to attach debug to
   * @param {string} prefix - debug namespace prefix
   * @param {string} suffix - debug namespace suffix, defaults to the class name
   * @return {object} The namespaced debug function
  */
  static attach(cls, prefix, suffix) {

    if (prefix === undefined || prefix === null) {
      prefix = this.default_prefix;
    }
    if (suffix === undefined || suffix === null) {
      suffix = cls.name;
    }
    let tag = `${prefix}:${suffix}`;
    debug('Attaching debug "%s" to class %s', tag, cls.name);
    let cls_debug = (0, _debug2.default)(tag);

    cls.prototype.debugr = cls_debug;
    cls.prototype.debug = cls_debug.enabled ? cls_debug : noop;
    cls.debugr = cls_debug;
    cls.debug = cls_debug.enabled ? cls_debug : noop;
    return this.debugs[tag] = cls_debug;
  }

  /**
   * @summary Attach a debug to a class instance
   * @description Attach a debug namespace to a class instance, with optional `[data]` after the `prefix:suffix`
   * @param {object} instance - A class instance to attach debug to
   * @param {string} prefix - debug namespace prefix
   * @param {string} data - debug namespace data (after suffix)
   * @return {object} The namespaced debug function
   */
  static instance(instance, prefix, data) {
    let cls = instance.constructor;
    debug('Attaching debug "%s" to class "%s" instance with data "%s"', prefix, cls.name, data);

    prefix = prefix || this.default_prefix;
    let tag = `${prefix}:${cls.name}`;
    if (data) tag += `[${data}]`;

    let cls_debug = (0, _debug2.default)(tag);
    instance.debugr = cls_debug;
    instance.debug = cls_debug.enabled ? cls_debug : noop;
    return this.debugs[tag] = cls_debug;
  }

  /**
   * @summary Create a debug instance with a set prefix
   * @description The ClassDebug instance manages a fixed prefix for the debug namespaces you want to attach to other classes. 
   * @param {string} prefix - debug namespace prefix
   */
  constructor(prefix) {
    this.prefix = prefix || this.constructor.default_prefix;
  }

  /**
   * @summary Attach a debug namespace to a class
   * @description  Attaches a debug namespace of the format `prefix:suffix` to the specified class at `.debug` and `.debugr`.
   * @param {Class}  cls - Class to attach debug to
   * @param {string} suffix - debug namespace suffix, defaults to the class name
   * @return {object} The namespaced debug function
  */
  attach(cls, suffix) {
    return this.constructor.attach(cls, this.prefix, suffix);
  }

  /**
   * Attach a debug namespace to a class instance, with optional `[data]` after the `prefix:suffix`
   *
   * @param {Class}  cls - Class to attach debug to
   * @param {string} data - debug namespace data, defaults to the class name
   * @return {object} The namespaced debug function
  */
  instance(instance, data) {
    return this.constructor.instance(instance, this.prefix, data);
  }

}

exports.ClassDebug = ClassDebug;
ClassDebug._classInit();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DbGFzc0RlYnVnLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwibm9vcCIsIkNsYXNzRGVidWciLCJfY2xhc3NJbml0IiwiZGVmYXVsdF9wcmVmaXgiLCJkZWJ1Z3MiLCJzZXR1cCIsImNscyIsInByZWZpeCIsImFfZGVidWciLCJhdHRhY2giLCJleHRlbmQiLCJuYW1lIiwiY2xhc3NlcyIsInN1ZmZpeCIsInVuZGVmaW5lZCIsInRhZyIsImNsc19kZWJ1ZyIsInByb3RvdHlwZSIsImRlYnVnciIsImVuYWJsZWQiLCJpbnN0YW5jZSIsImRhdGEiLCJjb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7QUFDQSxNQUFNQSxRQUFRLHFCQUFPLGdCQUFQLENBQWQ7QUFDQSxNQUFNQyxPQUFPLFNBQVBBLElBQU8sR0FBVSxDQUFFLENBQXpCOztBQUVBOzs7Ozs7OztBQVFPLE1BQU1DLFVBQU4sQ0FBaUI7O0FBRXRCO0FBQ0EsU0FBT0MsVUFBUCxHQUFtQjtBQUNqQjs7Ozs7O0FBTUEsU0FBS0MsY0FBTCxHQUFzQixJQUF0Qjs7QUFFQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDs7QUFFQSxXQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7QUFLQSxTQUFPQyxLQUFQLENBQWNDLEdBQWQsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQ3pCLFVBQU1DLFVBQVUsSUFBSSxJQUFKLENBQVVELE1BQVYsQ0FBaEI7QUFDQUMsWUFBUUMsTUFBUixDQUFlSCxHQUFmO0FBQ0EsV0FBT0UsT0FBUDtBQUNEOztBQUVEOzs7Ozs7QUFNQSxTQUFPRSxNQUFQLENBQWVILE1BQWYsRUFBdUJJLE9BQU8sT0FBOUIsRUFBdUM7QUFDckMsUUFBSUMsVUFBVSxFQUFkO0FBQ0FBLFlBQVFELElBQVIsSUFBZ0IsY0FBYyxJQUFkLENBQW1CLEVBQW5DO0FBQ0E7QUFDQUMsWUFBUUQsSUFBUixFQUFjUixjQUFkLEdBQStCSSxNQUEvQjtBQUNBLFdBQU9LLFFBQVFELElBQVIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7OztBQVFBLFNBQU9GLE1BQVAsQ0FBZUgsR0FBZixFQUFvQkMsTUFBcEIsRUFBNEJNLE1BQTVCLEVBQW9DOztBQUVsQyxRQUFLTixXQUFXTyxTQUFYLElBQXdCUCxXQUFXLElBQXhDLEVBQStDO0FBQzdDQSxlQUFTLEtBQUtKLGNBQWQ7QUFDRDtBQUNELFFBQUtVLFdBQVdDLFNBQVgsSUFBd0JELFdBQVcsSUFBeEMsRUFBK0M7QUFDN0NBLGVBQVNQLElBQUlLLElBQWI7QUFDRDtBQUNELFFBQUlJLE1BQU8sR0FBRVIsTUFBTyxJQUFHTSxNQUFPLEVBQTlCO0FBQ0FkLFVBQU0sa0NBQU4sRUFBMENnQixHQUExQyxFQUErQ1QsSUFBSUssSUFBbkQ7QUFDQSxRQUFJSyxZQUFZLHFCQUFPRCxHQUFQLENBQWhCOztBQUVBVCxRQUFJVyxTQUFKLENBQWNDLE1BQWQsR0FBdUJGLFNBQXZCO0FBQ0FWLFFBQUlXLFNBQUosQ0FBY2xCLEtBQWQsR0FBdUJpQixVQUFVRyxPQUFYLEdBQXNCSCxTQUF0QixHQUFrQ2hCLElBQXhEO0FBQ0FNLFFBQUlZLE1BQUosR0FBYUYsU0FBYjtBQUNBVixRQUFJUCxLQUFKLEdBQWFpQixVQUFVRyxPQUFYLEdBQXNCSCxTQUF0QixHQUFrQ2hCLElBQTlDO0FBQ0EsV0FBTyxLQUFLSSxNQUFMLENBQVlXLEdBQVosSUFBbUJDLFNBQTFCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUUEsU0FBT0ksUUFBUCxDQUFpQkEsUUFBakIsRUFBMkJiLE1BQTNCLEVBQW1DYyxJQUFuQyxFQUF5QztBQUN2QyxRQUFJZixNQUFNYyxTQUFTRSxXQUFuQjtBQUNBdkIsVUFBTSw0REFBTixFQUFvRVEsTUFBcEUsRUFBNEVELElBQUlLLElBQWhGLEVBQXNGVSxJQUF0Rjs7QUFFQWQsYUFBU0EsVUFBVSxLQUFLSixjQUF4QjtBQUNBLFFBQUlZLE1BQU8sR0FBRVIsTUFBTyxJQUFHRCxJQUFJSyxJQUFLLEVBQWhDO0FBQ0EsUUFBSVUsSUFBSixFQUFVTixPQUFRLElBQUdNLElBQUssR0FBaEI7O0FBRVYsUUFBSUwsWUFBWSxxQkFBT0QsR0FBUCxDQUFoQjtBQUNBSyxhQUFTRixNQUFULEdBQWtCRixTQUFsQjtBQUNBSSxhQUFTckIsS0FBVCxHQUFrQmlCLFVBQVVHLE9BQVgsR0FBc0JILFNBQXRCLEdBQWtDaEIsSUFBbkQ7QUFDQSxXQUFPLEtBQUtJLE1BQUwsQ0FBWVcsR0FBWixJQUFtQkMsU0FBMUI7QUFDRDs7QUFHRDs7Ozs7QUFLQU0sY0FBYWYsTUFBYixFQUFxQjtBQUNuQixTQUFLQSxNQUFMLEdBQWNBLFVBQVUsS0FBS2UsV0FBTCxDQUFpQm5CLGNBQXpDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQU0sU0FBUUgsR0FBUixFQUFhTyxNQUFiLEVBQXFCO0FBQ25CLFdBQU8sS0FBS1MsV0FBTCxDQUFpQmIsTUFBakIsQ0FBd0JILEdBQXhCLEVBQTZCLEtBQUtDLE1BQWxDLEVBQTBDTSxNQUExQyxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQU8sV0FBVUEsUUFBVixFQUFvQkMsSUFBcEIsRUFBMEI7QUFDeEIsV0FBTyxLQUFLQyxXQUFMLENBQWlCRixRQUFqQixDQUEwQkEsUUFBMUIsRUFBb0MsS0FBS2IsTUFBekMsRUFBaURjLElBQWpELENBQVA7QUFDRDs7QUF6SHFCOztRQUFYcEIsVSxHQUFBQSxVO0FBNkhiQSxXQUFXQyxVQUFYIiwiZmlsZSI6IkNsYXNzRGVidWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBkZWJ1Z3IgZnJvbSAnZGVidWcnXG5jb25zdCBkZWJ1ZyA9IGRlYnVncignbWg6Y2xhc3MtZGVidWcnKVxuY29uc3Qgbm9vcCA9IGZ1bmN0aW9uKCl7fVxuXG4vKiogXG4gQSBoZWxwZXIgY2xhc3MgdG8gbWFuYWdlIFtkZWJ1Z10oaHR0cHM6Ly9naXRodWIuY29tL3Zpc2lvbm1lZGlhL2RlYnVnKVxuIGluc3RhbmNlcyBvbiBvdGhlciBjbGFzc2VzLlxuXG4gYGBgXG4gQ2xhc3NEZWJ1Zy5zZXR1cChNeUNsYXNzLCAnbWU6TXlDbGFzcycpXG4gYGBgIFxuKi9cbmV4cG9ydCBjbGFzcyBDbGFzc0RlYnVnIHtcblxuICAvLyBJbml0aWFsaXNlIHRoZSBjbGFzc1xuICBzdGF0aWMgX2NsYXNzSW5pdCgpe1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2UgQ2xhc3NEZWJ1Z1xuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkZWZhdWx0X3ByZWZpeCAtIFNldCBhIGdlbmVyaWMgcHJlZml4IHZhciwgc28gdXNlcnMgY2FuIHN1YmNsYXNzIGluIHRoZSB0aGVpciBhcHAgKHNlZSB7QGxpbmsgQ2xhc3NEZWJ1Zy5leHRlbmR9KVxuICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBkZWJ1Z3MgLSBBIHN0b3JlIGZvciB0aGUgZGVidWdzLCBzbyBpdCBjYW4gYmUgcG9zc2libGUgdG8gcmV0cm9hY3RpdmVseSBlbmFibGUvZGlzYWJsZSB0aGUgbm9vcCBhZnRlciBzdGFydHVwLiBUaGlzIGlzIHRvIGF2b2lkIHRoZSB0aGUgYGRlYnVnYCBmdW5jdGlvbiBjYWxsIG92ZXJoZWFkXG4gICAgKi9cblxuICAgIHRoaXMuZGVmYXVsdF9wcmVmaXggPSAnbWgnXG5cbiAgICB0aGlzLmRlYnVncyA9IHt9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9IFxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gQ29tcGxldGUgc2V0dXAgZm9yIGEgbW9kdWxlXG4gICAqIEBwYXJhbSB7Q2xhc3N9ICBjbHMgLSBDbGFzcyB0byBhdHRhY2ggZGVidWcgdG9cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCAtIGRlYnVnIG5hbWVzcGFjZSBwcmVmaXhcbiAgICovXG4gIHN0YXRpYyBzZXR1cCggY2xzLCBwcmVmaXggKXtcbiAgICBjb25zdCBhX2RlYnVnID0gbmV3IHRoaXMoIHByZWZpeCApXG4gICAgYV9kZWJ1Zy5hdHRhY2goY2xzKVxuICAgIHJldHVybiBhX2RlYnVnXG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEV4dGVuZCB0aGlzIGNsYXNzIHRvIGluY2x1ZGUgYSBjdXN0b20gZGVmYXVsdCBwcmVmaXggZm9yIGFuIGV4dGVybmFsIG1vZHVsZSB0byB1c2UuIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gZGVidWcgbmFtZXNwYWNlIHByZWZpeFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIEphdmFzY3JpcHQgbmFtZSBvZiB0aGUgY2xhc3NcbiAgICogQHJldHVybiB7Q2xhc3N9IFRoZSBleHRlbmRlZCBDbGFzc0RlYnVnIGNsYXNzXG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKCBwcmVmaXgsIG5hbWUgPSAnRGVidWcnICl7XG4gICAgbGV0IGNsYXNzZXMgPSB7fVxuICAgIGNsYXNzZXNbbmFtZV0gPSBjbGFzcyBleHRlbmRzIHRoaXMge31cbiAgICAvL19EZWJ1Zy5uYW1lID0gbmFtZVxuICAgIGNsYXNzZXNbbmFtZV0uZGVmYXVsdF9wcmVmaXggPSBwcmVmaXhcbiAgICByZXR1cm4gY2xhc3Nlc1tuYW1lXVxuICB9XG5cbiAgLyoqXG4gICAqIEBzdW1tYXJ5IEF0dGFjaCBhIGRlYnVnIHRvIGEgY2xhc3NcbiAgICogQGRlc2NyaXB0aW9uIEF0dGFjaGVzIGEgZGVidWcgbmFtZXNwYWNlIHdpdGggdGhlIGZvcm1hdCBgcHJlZml4OnN1ZmZpeGAgdG8gYSBjbGFzcyBhbmQgaXQncyBwcm90b3R5cGUgYXQgYC5kZWJ1Z2AgYW5kIGAuZGVidWdyYC5cbiAgICogQHBhcmFtIHtDbGFzc30gIGNscyAtIENsYXNzIHRvIGF0dGFjaCBkZWJ1ZyB0b1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gZGVidWcgbmFtZXNwYWNlIHByZWZpeFxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3VmZml4IC0gZGVidWcgbmFtZXNwYWNlIHN1ZmZpeCwgZGVmYXVsdHMgdG8gdGhlIGNsYXNzIG5hbWVcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgbmFtZXNwYWNlZCBkZWJ1ZyBmdW5jdGlvblxuICAqL1xuICBzdGF0aWMgYXR0YWNoKCBjbHMsIHByZWZpeCwgc3VmZml4ICl7XG5cbiAgICBpZiAoIHByZWZpeCA9PT0gdW5kZWZpbmVkIHx8IHByZWZpeCA9PT0gbnVsbCApIHtcbiAgICAgIHByZWZpeCA9IHRoaXMuZGVmYXVsdF9wcmVmaXhcbiAgICB9XG4gICAgaWYgKCBzdWZmaXggPT09IHVuZGVmaW5lZCB8fCBzdWZmaXggPT09IG51bGwgKSB7XG4gICAgICBzdWZmaXggPSBjbHMubmFtZVxuICAgIH1cbiAgICBsZXQgdGFnID0gYCR7cHJlZml4fToke3N1ZmZpeH1gXG4gICAgZGVidWcoJ0F0dGFjaGluZyBkZWJ1ZyBcIiVzXCIgdG8gY2xhc3MgJXMnLCB0YWcsIGNscy5uYW1lKVxuICAgIGxldCBjbHNfZGVidWcgPSBkZWJ1Z3IodGFnKVxuXG4gICAgY2xzLnByb3RvdHlwZS5kZWJ1Z3IgPSBjbHNfZGVidWdcbiAgICBjbHMucHJvdG90eXBlLmRlYnVnID0gKGNsc19kZWJ1Zy5lbmFibGVkKSA/IGNsc19kZWJ1ZyA6IG5vb3BcbiAgICBjbHMuZGVidWdyID0gY2xzX2RlYnVnXG4gICAgY2xzLmRlYnVnID0gKGNsc19kZWJ1Zy5lbmFibGVkKSA/IGNsc19kZWJ1ZyA6IG5vb3BcbiAgICByZXR1cm4gdGhpcy5kZWJ1Z3NbdGFnXSA9IGNsc19kZWJ1Z1xuICB9XG5cbiAgLyoqXG4gICAqIEBzdW1tYXJ5IEF0dGFjaCBhIGRlYnVnIHRvIGEgY2xhc3MgaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIEF0dGFjaCBhIGRlYnVnIG5hbWVzcGFjZSB0byBhIGNsYXNzIGluc3RhbmNlLCB3aXRoIG9wdGlvbmFsIGBbZGF0YV1gIGFmdGVyIHRoZSBgcHJlZml4OnN1ZmZpeGBcbiAgICogQHBhcmFtIHtvYmplY3R9IGluc3RhbmNlIC0gQSBjbGFzcyBpbnN0YW5jZSB0byBhdHRhY2ggZGVidWcgdG9cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCAtIGRlYnVnIG5hbWVzcGFjZSBwcmVmaXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGEgLSBkZWJ1ZyBuYW1lc3BhY2UgZGF0YSAoYWZ0ZXIgc3VmZml4KVxuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBuYW1lc3BhY2VkIGRlYnVnIGZ1bmN0aW9uXG4gICAqL1xuICBzdGF0aWMgaW5zdGFuY2UoIGluc3RhbmNlLCBwcmVmaXgsIGRhdGEgKXtcbiAgICBsZXQgY2xzID0gaW5zdGFuY2UuY29uc3RydWN0b3JcbiAgICBkZWJ1ZygnQXR0YWNoaW5nIGRlYnVnIFwiJXNcIiB0byBjbGFzcyBcIiVzXCIgaW5zdGFuY2Ugd2l0aCBkYXRhIFwiJXNcIicsIHByZWZpeCwgY2xzLm5hbWUsIGRhdGEpXG5cbiAgICBwcmVmaXggPSBwcmVmaXggfHwgdGhpcy5kZWZhdWx0X3ByZWZpeFxuICAgIGxldCB0YWcgPSBgJHtwcmVmaXh9OiR7Y2xzLm5hbWV9YFxuICAgIGlmIChkYXRhKSB0YWcgKz0gYFske2RhdGF9XWBcblxuICAgIGxldCBjbHNfZGVidWcgPSBkZWJ1Z3IodGFnKVxuICAgIGluc3RhbmNlLmRlYnVnciA9IGNsc19kZWJ1Z1xuICAgIGluc3RhbmNlLmRlYnVnID0gKGNsc19kZWJ1Zy5lbmFibGVkKSA/IGNsc19kZWJ1ZyA6IG5vb3BcbiAgICByZXR1cm4gdGhpcy5kZWJ1Z3NbdGFnXSA9IGNsc19kZWJ1Z1xuICB9XG5cbiAgXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBDcmVhdGUgYSBkZWJ1ZyBpbnN0YW5jZSB3aXRoIGEgc2V0IHByZWZpeFxuICAgKiBAZGVzY3JpcHRpb24gVGhlIENsYXNzRGVidWcgaW5zdGFuY2UgbWFuYWdlcyBhIGZpeGVkIHByZWZpeCBmb3IgdGhlIGRlYnVnIG5hbWVzcGFjZXMgeW91IHdhbnQgdG8gYXR0YWNoIHRvIG90aGVyIGNsYXNzZXMuIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gZGVidWcgbmFtZXNwYWNlIHByZWZpeFxuICAgKi9cbiAgY29uc3RydWN0b3IoIHByZWZpeCApe1xuICAgIHRoaXMucHJlZml4ID0gcHJlZml4IHx8IHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdF9wcmVmaXhcbiAgfVxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBBdHRhY2ggYSBkZWJ1ZyBuYW1lc3BhY2UgdG8gYSBjbGFzc1xuICAgKiBAZGVzY3JpcHRpb24gIEF0dGFjaGVzIGEgZGVidWcgbmFtZXNwYWNlIG9mIHRoZSBmb3JtYXQgYHByZWZpeDpzdWZmaXhgIHRvIHRoZSBzcGVjaWZpZWQgY2xhc3MgYXQgYC5kZWJ1Z2AgYW5kIGAuZGVidWdyYC5cbiAgICogQHBhcmFtIHtDbGFzc30gIGNscyAtIENsYXNzIHRvIGF0dGFjaCBkZWJ1ZyB0b1xuICAgKiBAcGFyYW0ge3N0cmluZ30gc3VmZml4IC0gZGVidWcgbmFtZXNwYWNlIHN1ZmZpeCwgZGVmYXVsdHMgdG8gdGhlIGNsYXNzIG5hbWVcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgbmFtZXNwYWNlZCBkZWJ1ZyBmdW5jdGlvblxuICAqL1xuICBhdHRhY2goIGNscywgc3VmZml4ICl7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuYXR0YWNoKGNscywgdGhpcy5wcmVmaXgsIHN1ZmZpeClcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBkZWJ1ZyBuYW1lc3BhY2UgdG8gYSBjbGFzcyBpbnN0YW5jZSwgd2l0aCBvcHRpb25hbCBgW2RhdGFdYCBhZnRlciB0aGUgYHByZWZpeDpzdWZmaXhgXG4gICAqXG4gICAqIEBwYXJhbSB7Q2xhc3N9ICBjbHMgLSBDbGFzcyB0byBhdHRhY2ggZGVidWcgdG9cbiAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGEgLSBkZWJ1ZyBuYW1lc3BhY2UgZGF0YSwgZGVmYXVsdHMgdG8gdGhlIGNsYXNzIG5hbWVcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgbmFtZXNwYWNlZCBkZWJ1ZyBmdW5jdGlvblxuICAqL1xuICBpbnN0YW5jZSggaW5zdGFuY2UsIGRhdGEgKXtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5pbnN0YW5jZShpbnN0YW5jZSwgdGhpcy5wcmVmaXgsIGRhdGEpXG4gIH1cblxufVxuXG5DbGFzc0RlYnVnLl9jbGFzc0luaXQoKVxuXG4iXX0=