'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassDebug = undefined;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug2.default)('mh:class-debug');
const noop = function () {};

/** Class to manage debug on other classes */
class ClassDebug {

  /** 
   * Initialise the class
   */
  static classInit() {
    // Set a generic prefix var, so users can subclass in the their app (see {@link ClassDebug#extend})
    this.default_prefix = 'mh';

    // Create a store for debugs, so it can be possible to retroactively 
    // enable/disable the noop to avoid after startup. 
    // This is to avoid the the `debug` function call overhead
    this.debugs = {};

    return this;
  }

  /**
   * Complete setup for a module
    * @param {Class}  cls - Class to attach debug to
   * @param {string} prefix - debug namespace prefix
   */
  static setup(cls, prefix) {
    const a_debug = new this(prefix);
    a_debug.attach(cls);
    return a_debug;
  }

  /**
   * Extend this class to include a custom prefix for an external
   * module to use. 
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
   * @description Attach a debug namespace to a class
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
   * @description Attach a debug to a class instance, with optional `[data]` after the `prefix:suffix`
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
   * Create a debug instance with a set prefix
    * @param {string} prefix - debug namespace prefix
   */
  constructor(prefix) {
    this.prefix = prefix || this.constructor.default_prefix;
  }

  /**
   * Attach a debug namespace to a class: `prefix:suffix`
   *
   * @param {Class}  cls - Class to attach debug to
   * @param {string} suffix - debug namespace suffix, defaults to the class name
   * @return {object} The namespaced debug function
  */
  attach(cls, suffix) {
    return this.constructor.attach(cls, this.prefix, suffix);
  }

  /**
   * Attach a debug namespace to a class instance, with optional: `prefix:suffix[data]`
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
ClassDebug.classInit();

exports.default = ClassDebug;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DbGFzc0RlYnVnLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwibm9vcCIsIkNsYXNzRGVidWciLCJjbGFzc0luaXQiLCJkZWZhdWx0X3ByZWZpeCIsImRlYnVncyIsInNldHVwIiwiY2xzIiwicHJlZml4IiwiYV9kZWJ1ZyIsImF0dGFjaCIsImV4dGVuZCIsIm5hbWUiLCJjbGFzc2VzIiwic3VmZml4IiwidW5kZWZpbmVkIiwidGFnIiwiY2xzX2RlYnVnIiwicHJvdG90eXBlIiwiZGVidWdyIiwiZW5hYmxlZCIsImluc3RhbmNlIiwiZGF0YSIsImNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7OztBQUNBLE1BQU1BLFFBQVEscUJBQU8sZ0JBQVAsQ0FBZDtBQUNBLE1BQU1DLE9BQU8sWUFBVSxDQUFFLENBQXpCOztBQUVBO0FBQ08sTUFBTUMsVUFBTixDQUFpQjs7QUFFdEI7OztBQUdBLFNBQU9DLFNBQVAsR0FBa0I7QUFDaEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLElBQXRCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkOztBQUVBLFdBQU8sSUFBUDtBQUNEOztBQUVEOzs7OztBQU1BLFNBQU9DLEtBQVAsQ0FBY0MsR0FBZCxFQUFtQkMsTUFBbkIsRUFBMkI7QUFDekIsVUFBTUMsVUFBVSxJQUFJLElBQUosQ0FBVUQsTUFBVixDQUFoQjtBQUNBQyxZQUFRQyxNQUFSLENBQWVILEdBQWY7QUFDQSxXQUFPRSxPQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFRQSxTQUFPRSxNQUFQLENBQWVILE1BQWYsRUFBdUJJLE9BQU8sT0FBOUIsRUFBdUM7QUFDckMsUUFBSUMsVUFBVSxFQUFkO0FBQ0FBLFlBQVFELElBQVIsSUFBZ0IsY0FBYyxJQUFkLENBQW1CLEVBQW5DO0FBQ0E7QUFDQUMsWUFBUUQsSUFBUixFQUFjUixjQUFkLEdBQStCSSxNQUEvQjtBQUNBLFdBQU9LLFFBQVFELElBQVIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7O0FBT0EsU0FBT0YsTUFBUCxDQUFlSCxHQUFmLEVBQW9CQyxNQUFwQixFQUE0Qk0sTUFBNUIsRUFBb0M7O0FBRWxDLFFBQUtOLFdBQVdPLFNBQVgsSUFBd0JQLFdBQVcsSUFBeEMsRUFBK0M7QUFDN0NBLGVBQVMsS0FBS0osY0FBZDtBQUNEO0FBQ0QsUUFBS1UsV0FBV0MsU0FBWCxJQUF3QkQsV0FBVyxJQUF4QyxFQUErQztBQUM3Q0EsZUFBU1AsSUFBSUssSUFBYjtBQUNEO0FBQ0QsUUFBSUksTUFBTyxHQUFFUixNQUFPLElBQUdNLE1BQU8sRUFBOUI7QUFDQWQsVUFBTSxrQ0FBTixFQUEwQ2dCLEdBQTFDLEVBQStDVCxJQUFJSyxJQUFuRDtBQUNBLFFBQUlLLFlBQVkscUJBQU9ELEdBQVAsQ0FBaEI7O0FBRUFULFFBQUlXLFNBQUosQ0FBY0MsTUFBZCxHQUF1QkYsU0FBdkI7QUFDQVYsUUFBSVcsU0FBSixDQUFjbEIsS0FBZCxHQUF1QmlCLFVBQVVHLE9BQVgsR0FBc0JILFNBQXRCLEdBQWtDaEIsSUFBeEQ7QUFDQU0sUUFBSVksTUFBSixHQUFhRixTQUFiO0FBQ0FWLFFBQUlQLEtBQUosR0FBYWlCLFVBQVVHLE9BQVgsR0FBc0JILFNBQXRCLEdBQWtDaEIsSUFBOUM7QUFDQSxXQUFPLEtBQUtJLE1BQUwsQ0FBWVcsR0FBWixJQUFtQkMsU0FBMUI7QUFDRDs7QUFFRDs7Ozs7OztBQU9BLFNBQU9JLFFBQVAsQ0FBaUJBLFFBQWpCLEVBQTJCYixNQUEzQixFQUFtQ2MsSUFBbkMsRUFBeUM7QUFDdkMsUUFBSWYsTUFBTWMsU0FBU0UsV0FBbkI7QUFDQXZCLFVBQU0sNERBQU4sRUFBb0VRLE1BQXBFLEVBQTRFRCxJQUFJSyxJQUFoRixFQUFzRlUsSUFBdEY7O0FBRUFkLGFBQVNBLFVBQVUsS0FBS0osY0FBeEI7QUFDQSxRQUFJWSxNQUFPLEdBQUVSLE1BQU8sSUFBR0QsSUFBSUssSUFBSyxFQUFoQztBQUNBLFFBQUlVLElBQUosRUFBVU4sT0FBUSxJQUFHTSxJQUFLLEdBQWhCOztBQUVWLFFBQUlMLFlBQVkscUJBQU9ELEdBQVAsQ0FBaEI7QUFDQUssYUFBU0YsTUFBVCxHQUFrQkYsU0FBbEI7QUFDQUksYUFBU3JCLEtBQVQsR0FBa0JpQixVQUFVRyxPQUFYLEdBQXNCSCxTQUF0QixHQUFrQ2hCLElBQW5EO0FBQ0EsV0FBTyxLQUFLSSxNQUFMLENBQVlXLEdBQVosSUFBbUJDLFNBQTFCO0FBQ0Q7O0FBR0Q7Ozs7QUFLQU0sY0FBYWYsTUFBYixFQUFxQjtBQUNuQixTQUFLQSxNQUFMLEdBQWNBLFVBQVUsS0FBS2UsV0FBTCxDQUFpQm5CLGNBQXpDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQU0sU0FBUUgsR0FBUixFQUFhTyxNQUFiLEVBQXFCO0FBQ25CLFdBQU8sS0FBS1MsV0FBTCxDQUFpQmIsTUFBakIsQ0FBd0JILEdBQXhCLEVBQTZCLEtBQUtDLE1BQWxDLEVBQTBDTSxNQUExQyxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQU8sV0FBVUEsUUFBVixFQUFvQkMsSUFBcEIsRUFBMEI7QUFDeEIsV0FBTyxLQUFLQyxXQUFMLENBQWlCRixRQUFqQixDQUEwQkEsUUFBMUIsRUFBb0MsS0FBS2IsTUFBekMsRUFBaURjLElBQWpELENBQVA7QUFDRDs7QUExSHFCOztRQUFYcEIsVSxHQUFBQSxVO0FBOEhiQSxXQUFXQyxTQUFYOztrQkFFZUQsVSIsImZpbGUiOiJDbGFzc0RlYnVnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgZGVidWdyIGZyb20gJ2RlYnVnJ1xuY29uc3QgZGVidWcgPSBkZWJ1Z3IoJ21oOmNsYXNzLWRlYnVnJylcbmNvbnN0IG5vb3AgPSBmdW5jdGlvbigpe31cblxuLyoqIENsYXNzIHRvIG1hbmFnZSBkZWJ1ZyBvbiBvdGhlciBjbGFzc2VzICovXG5leHBvcnQgY2xhc3MgQ2xhc3NEZWJ1ZyB7XG5cbiAgLyoqIFxuICAgKiBJbml0aWFsaXNlIHRoZSBjbGFzc1xuICAgKi9cbiAgc3RhdGljIGNsYXNzSW5pdCgpe1xuICAgIC8vIFNldCBhIGdlbmVyaWMgcHJlZml4IHZhciwgc28gdXNlcnMgY2FuIHN1YmNsYXNzIGluIHRoZSB0aGVpciBhcHAgKHNlZSB7QGxpbmsgQ2xhc3NEZWJ1ZyNleHRlbmR9KVxuICAgIHRoaXMuZGVmYXVsdF9wcmVmaXggPSAnbWgnXG5cbiAgICAvLyBDcmVhdGUgYSBzdG9yZSBmb3IgZGVidWdzLCBzbyBpdCBjYW4gYmUgcG9zc2libGUgdG8gcmV0cm9hY3RpdmVseSBcbiAgICAvLyBlbmFibGUvZGlzYWJsZSB0aGUgbm9vcCB0byBhdm9pZCBhZnRlciBzdGFydHVwLiBcbiAgICAvLyBUaGlzIGlzIHRvIGF2b2lkIHRoZSB0aGUgYGRlYnVnYCBmdW5jdGlvbiBjYWxsIG92ZXJoZWFkXG4gICAgdGhpcy5kZWJ1Z3MgPSB7fVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfSBcblxuICAvKipcbiAgICogQ29tcGxldGUgc2V0dXAgZm9yIGEgbW9kdWxlXG5cbiAgICogQHBhcmFtIHtDbGFzc30gIGNscyAtIENsYXNzIHRvIGF0dGFjaCBkZWJ1ZyB0b1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gZGVidWcgbmFtZXNwYWNlIHByZWZpeFxuICAgKi9cbiAgc3RhdGljIHNldHVwKCBjbHMsIHByZWZpeCApe1xuICAgIGNvbnN0IGFfZGVidWcgPSBuZXcgdGhpcyggcHJlZml4IClcbiAgICBhX2RlYnVnLmF0dGFjaChjbHMpXG4gICAgcmV0dXJuIGFfZGVidWdcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRlbmQgdGhpcyBjbGFzcyB0byBpbmNsdWRlIGEgY3VzdG9tIHByZWZpeCBmb3IgYW4gZXh0ZXJuYWxcbiAgICogbW9kdWxlIHRvIHVzZS4gXG5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCAtIGRlYnVnIG5hbWVzcGFjZSBwcmVmaXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBKYXZhc2NyaXB0IG5hbWUgb2YgdGhlIGNsYXNzXG4gICAqIEByZXR1cm4ge0NsYXNzfSBUaGUgZXh0ZW5kZWQgQ2xhc3NEZWJ1ZyBjbGFzc1xuICAgKi9cbiAgc3RhdGljIGV4dGVuZCggcHJlZml4LCBuYW1lID0gJ0RlYnVnJyApe1xuICAgIGxldCBjbGFzc2VzID0ge31cbiAgICBjbGFzc2VzW25hbWVdID0gY2xhc3MgZXh0ZW5kcyB0aGlzIHt9XG4gICAgLy9fRGVidWcubmFtZSA9IG5hbWVcbiAgICBjbGFzc2VzW25hbWVdLmRlZmF1bHRfcHJlZml4ID0gcHJlZml4XG4gICAgcmV0dXJuIGNsYXNzZXNbbmFtZV1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gQXR0YWNoIGEgZGVidWcgbmFtZXNwYWNlIHRvIGEgY2xhc3NcbiAgICogQHBhcmFtIHtDbGFzc30gIGNscyAtIENsYXNzIHRvIGF0dGFjaCBkZWJ1ZyB0b1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gZGVidWcgbmFtZXNwYWNlIHByZWZpeFxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3VmZml4IC0gZGVidWcgbmFtZXNwYWNlIHN1ZmZpeCwgZGVmYXVsdHMgdG8gdGhlIGNsYXNzIG5hbWVcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgbmFtZXNwYWNlZCBkZWJ1ZyBmdW5jdGlvblxuICAqL1xuICBzdGF0aWMgYXR0YWNoKCBjbHMsIHByZWZpeCwgc3VmZml4ICl7XG5cbiAgICBpZiAoIHByZWZpeCA9PT0gdW5kZWZpbmVkIHx8IHByZWZpeCA9PT0gbnVsbCApIHtcbiAgICAgIHByZWZpeCA9IHRoaXMuZGVmYXVsdF9wcmVmaXhcbiAgICB9XG4gICAgaWYgKCBzdWZmaXggPT09IHVuZGVmaW5lZCB8fCBzdWZmaXggPT09IG51bGwgKSB7XG4gICAgICBzdWZmaXggPSBjbHMubmFtZVxuICAgIH1cbiAgICBsZXQgdGFnID0gYCR7cHJlZml4fToke3N1ZmZpeH1gXG4gICAgZGVidWcoJ0F0dGFjaGluZyBkZWJ1ZyBcIiVzXCIgdG8gY2xhc3MgJXMnLCB0YWcsIGNscy5uYW1lKVxuICAgIGxldCBjbHNfZGVidWcgPSBkZWJ1Z3IodGFnKVxuXG4gICAgY2xzLnByb3RvdHlwZS5kZWJ1Z3IgPSBjbHNfZGVidWdcbiAgICBjbHMucHJvdG90eXBlLmRlYnVnID0gKGNsc19kZWJ1Zy5lbmFibGVkKSA/IGNsc19kZWJ1ZyA6IG5vb3BcbiAgICBjbHMuZGVidWdyID0gY2xzX2RlYnVnXG4gICAgY2xzLmRlYnVnID0gKGNsc19kZWJ1Zy5lbmFibGVkKSA/IGNsc19kZWJ1ZyA6IG5vb3BcbiAgICByZXR1cm4gdGhpcy5kZWJ1Z3NbdGFnXSA9IGNsc19kZWJ1Z1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBBdHRhY2ggYSBkZWJ1ZyB0byBhIGNsYXNzIGluc3RhbmNlLCB3aXRoIG9wdGlvbmFsIGBbZGF0YV1gIGFmdGVyIHRoZSBgcHJlZml4OnN1ZmZpeGBcbiAgICogQHBhcmFtIHtvYmplY3R9IGluc3RhbmNlIC0gQSBjbGFzcyBpbnN0YW5jZSB0byBhdHRhY2ggZGVidWcgdG9cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCAtIGRlYnVnIG5hbWVzcGFjZSBwcmVmaXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGEgLSBkZWJ1ZyBuYW1lc3BhY2UgZGF0YSAoYWZ0ZXIgc3VmZml4KVxuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBuYW1lc3BhY2VkIGRlYnVnIGZ1bmN0aW9uXG4gICAqL1xuICBzdGF0aWMgaW5zdGFuY2UoIGluc3RhbmNlLCBwcmVmaXgsIGRhdGEgKXtcbiAgICBsZXQgY2xzID0gaW5zdGFuY2UuY29uc3RydWN0b3JcbiAgICBkZWJ1ZygnQXR0YWNoaW5nIGRlYnVnIFwiJXNcIiB0byBjbGFzcyBcIiVzXCIgaW5zdGFuY2Ugd2l0aCBkYXRhIFwiJXNcIicsIHByZWZpeCwgY2xzLm5hbWUsIGRhdGEpXG5cbiAgICBwcmVmaXggPSBwcmVmaXggfHwgdGhpcy5kZWZhdWx0X3ByZWZpeFxuICAgIGxldCB0YWcgPSBgJHtwcmVmaXh9OiR7Y2xzLm5hbWV9YFxuICAgIGlmIChkYXRhKSB0YWcgKz0gYFske2RhdGF9XWBcblxuICAgIGxldCBjbHNfZGVidWcgPSBkZWJ1Z3IodGFnKVxuICAgIGluc3RhbmNlLmRlYnVnciA9IGNsc19kZWJ1Z1xuICAgIGluc3RhbmNlLmRlYnVnID0gKGNsc19kZWJ1Zy5lbmFibGVkKSA/IGNsc19kZWJ1ZyA6IG5vb3BcbiAgICByZXR1cm4gdGhpcy5kZWJ1Z3NbdGFnXSA9IGNsc19kZWJ1Z1xuICB9XG5cbiAgXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBkZWJ1ZyBpbnN0YW5jZSB3aXRoIGEgc2V0IHByZWZpeFxuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggLSBkZWJ1ZyBuYW1lc3BhY2UgcHJlZml4XG4gICAqL1xuICBjb25zdHJ1Y3RvciggcHJlZml4ICl7XG4gICAgdGhpcy5wcmVmaXggPSBwcmVmaXggfHwgdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0X3ByZWZpeFxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGRlYnVnIG5hbWVzcGFjZSB0byBhIGNsYXNzOiBgcHJlZml4OnN1ZmZpeGBcbiAgICpcbiAgICogQHBhcmFtIHtDbGFzc30gIGNscyAtIENsYXNzIHRvIGF0dGFjaCBkZWJ1ZyB0b1xuICAgKiBAcGFyYW0ge3N0cmluZ30gc3VmZml4IC0gZGVidWcgbmFtZXNwYWNlIHN1ZmZpeCwgZGVmYXVsdHMgdG8gdGhlIGNsYXNzIG5hbWVcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgbmFtZXNwYWNlZCBkZWJ1ZyBmdW5jdGlvblxuICAqL1xuICBhdHRhY2goIGNscywgc3VmZml4ICl7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuYXR0YWNoKGNscywgdGhpcy5wcmVmaXgsIHN1ZmZpeClcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBkZWJ1ZyBuYW1lc3BhY2UgdG8gYSBjbGFzcyBpbnN0YW5jZSwgd2l0aCBvcHRpb25hbDogYHByZWZpeDpzdWZmaXhbZGF0YV1gXG4gICAqXG4gICAqIEBwYXJhbSB7Q2xhc3N9ICBjbHMgLSBDbGFzcyB0byBhdHRhY2ggZGVidWcgdG9cbiAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGEgLSBkZWJ1ZyBuYW1lc3BhY2UgZGF0YSwgZGVmYXVsdHMgdG8gdGhlIGNsYXNzIG5hbWVcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgbmFtZXNwYWNlZCBkZWJ1ZyBmdW5jdGlvblxuICAqL1xuICBpbnN0YW5jZSggaW5zdGFuY2UsIGRhdGEgKXtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5pbnN0YW5jZShpbnN0YW5jZSwgdGhpcy5wcmVmaXgsIGRhdGEpXG4gIH1cblxufVxuXG5DbGFzc0RlYnVnLmNsYXNzSW5pdCgpXG5cbmV4cG9ydCBkZWZhdWx0IENsYXNzRGVidWciXX0=