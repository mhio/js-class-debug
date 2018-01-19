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
    // Set a generic prefix var, so users can subclass in the their app (see `ClassDebug.extend()`)
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
   * Attach a debug namespace to a class
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
   * Attach a debug to a class instance, with optional `[data]` after the `prefix:suffix`
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DbGFzc0RlYnVnLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwibm9vcCIsIkNsYXNzRGVidWciLCJjbGFzc0luaXQiLCJkZWZhdWx0X3ByZWZpeCIsImRlYnVncyIsInNldHVwIiwiY2xzIiwicHJlZml4IiwiYV9kZWJ1ZyIsImF0dGFjaCIsImV4dGVuZCIsIm5hbWUiLCJjbGFzc2VzIiwic3VmZml4IiwidW5kZWZpbmVkIiwidGFnIiwiY2xzX2RlYnVnIiwicHJvdG90eXBlIiwiZGVidWdyIiwiZW5hYmxlZCIsImluc3RhbmNlIiwiZGF0YSIsImNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7OztBQUNBLE1BQU1BLFFBQVEscUJBQU8sZ0JBQVAsQ0FBZDtBQUNBLE1BQU1DLE9BQU8sWUFBVSxDQUFFLENBQXpCOztBQUVBO0FBQ08sTUFBTUMsVUFBTixDQUFpQjs7QUFFdEI7OztBQUdBLFNBQU9DLFNBQVAsR0FBa0I7QUFDaEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLElBQXRCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkOztBQUVBLFdBQU8sSUFBUDtBQUNEOztBQUVEOzs7OztBQU1BLFNBQU9DLEtBQVAsQ0FBY0MsR0FBZCxFQUFtQkMsTUFBbkIsRUFBMkI7QUFDekIsVUFBTUMsVUFBVSxJQUFJLElBQUosQ0FBVUQsTUFBVixDQUFoQjtBQUNBQyxZQUFRQyxNQUFSLENBQWVILEdBQWY7QUFDQSxXQUFPRSxPQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFRQSxTQUFPRSxNQUFQLENBQWVILE1BQWYsRUFBdUJJLE9BQU8sT0FBOUIsRUFBdUM7QUFDckMsUUFBSUMsVUFBVSxFQUFkO0FBQ0FBLFlBQVFELElBQVIsSUFBZ0IsY0FBYyxJQUFkLENBQW1CLEVBQW5DO0FBQ0E7QUFDQUMsWUFBUUQsSUFBUixFQUFjUixjQUFkLEdBQStCSSxNQUEvQjtBQUNBLFdBQU9LLFFBQVFELElBQVIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7O0FBUUEsU0FBT0YsTUFBUCxDQUFlSCxHQUFmLEVBQW9CQyxNQUFwQixFQUE0Qk0sTUFBNUIsRUFBb0M7O0FBRWxDLFFBQUtOLFdBQVdPLFNBQVgsSUFBd0JQLFdBQVcsSUFBeEMsRUFBK0M7QUFDN0NBLGVBQVMsS0FBS0osY0FBZDtBQUNEO0FBQ0QsUUFBS1UsV0FBV0MsU0FBWCxJQUF3QkQsV0FBVyxJQUF4QyxFQUErQztBQUM3Q0EsZUFBU1AsSUFBSUssSUFBYjtBQUNEO0FBQ0QsUUFBSUksTUFBTyxHQUFFUixNQUFPLElBQUdNLE1BQU8sRUFBOUI7QUFDQWQsVUFBTSxrQ0FBTixFQUEwQ2dCLEdBQTFDLEVBQStDVCxJQUFJSyxJQUFuRDtBQUNBLFFBQUlLLFlBQVkscUJBQU9ELEdBQVAsQ0FBaEI7O0FBRUFULFFBQUlXLFNBQUosQ0FBY0MsTUFBZCxHQUF1QkYsU0FBdkI7QUFDQVYsUUFBSVcsU0FBSixDQUFjbEIsS0FBZCxHQUF1QmlCLFVBQVVHLE9BQVgsR0FBc0JILFNBQXRCLEdBQWtDaEIsSUFBeEQ7QUFDQU0sUUFBSVksTUFBSixHQUFhRixTQUFiO0FBQ0FWLFFBQUlQLEtBQUosR0FBYWlCLFVBQVVHLE9BQVgsR0FBc0JILFNBQXRCLEdBQWtDaEIsSUFBOUM7QUFDQSxXQUFPLEtBQUtJLE1BQUwsQ0FBWVcsR0FBWixJQUFtQkMsU0FBMUI7QUFDRDs7QUFFRDs7Ozs7OztBQVFBLFNBQU9JLFFBQVAsQ0FBaUJBLFFBQWpCLEVBQTJCYixNQUEzQixFQUFtQ2MsSUFBbkMsRUFBeUM7QUFDdkMsUUFBSWYsTUFBTWMsU0FBU0UsV0FBbkI7QUFDQXZCLFVBQU0sNERBQU4sRUFBb0VRLE1BQXBFLEVBQTRFRCxJQUFJSyxJQUFoRixFQUFzRlUsSUFBdEY7O0FBRUFkLGFBQVNBLFVBQVUsS0FBS0osY0FBeEI7QUFDQSxRQUFJWSxNQUFPLEdBQUVSLE1BQU8sSUFBR0QsSUFBSUssSUFBSyxFQUFoQztBQUNBLFFBQUlVLElBQUosRUFBVU4sT0FBUSxJQUFHTSxJQUFLLEdBQWhCOztBQUVWLFFBQUlMLFlBQVkscUJBQU9ELEdBQVAsQ0FBaEI7QUFDQUssYUFBU0YsTUFBVCxHQUFrQkYsU0FBbEI7QUFDQUksYUFBU3JCLEtBQVQsR0FBa0JpQixVQUFVRyxPQUFYLEdBQXNCSCxTQUF0QixHQUFrQ2hCLElBQW5EO0FBQ0EsV0FBTyxLQUFLSSxNQUFMLENBQVlXLEdBQVosSUFBbUJDLFNBQTFCO0FBQ0Q7O0FBR0Q7Ozs7QUFLQU0sY0FBYWYsTUFBYixFQUFxQjtBQUNuQixTQUFLQSxNQUFMLEdBQWNBLFVBQVUsS0FBS2UsV0FBTCxDQUFpQm5CLGNBQXpDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQU0sU0FBUUgsR0FBUixFQUFhTyxNQUFiLEVBQXFCO0FBQ25CLFdBQU8sS0FBS1MsV0FBTCxDQUFpQmIsTUFBakIsQ0FBd0JILEdBQXhCLEVBQTZCLEtBQUtDLE1BQWxDLEVBQTBDTSxNQUExQyxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQU8sV0FBVUEsUUFBVixFQUFvQkMsSUFBcEIsRUFBMEI7QUFDeEIsV0FBTyxLQUFLQyxXQUFMLENBQWlCRixRQUFqQixDQUEwQkEsUUFBMUIsRUFBb0MsS0FBS2IsTUFBekMsRUFBaURjLElBQWpELENBQVA7QUFDRDs7QUE1SHFCOztRQUFYcEIsVSxHQUFBQSxVO0FBZ0liQSxXQUFXQyxTQUFYOztrQkFFZUQsVSIsImZpbGUiOiJDbGFzc0RlYnVnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgZGVidWdyIGZyb20gJ2RlYnVnJ1xuY29uc3QgZGVidWcgPSBkZWJ1Z3IoJ21oOmNsYXNzLWRlYnVnJylcbmNvbnN0IG5vb3AgPSBmdW5jdGlvbigpe31cblxuLyoqIENsYXNzIHRvIG1hbmFnZSBkZWJ1ZyBvbiBvdGhlciBjbGFzc2VzICovXG5leHBvcnQgY2xhc3MgQ2xhc3NEZWJ1ZyB7XG5cbiAgLyoqIFxuICAgKiBJbml0aWFsaXNlIHRoZSBjbGFzc1xuICAgKi9cbiAgc3RhdGljIGNsYXNzSW5pdCgpe1xuICAgIC8vIFNldCBhIGdlbmVyaWMgcHJlZml4IHZhciwgc28gdXNlcnMgY2FuIHN1YmNsYXNzIGluIHRoZSB0aGVpciBhcHAgKHNlZSBgQ2xhc3NEZWJ1Zy5leHRlbmQoKWApXG4gICAgdGhpcy5kZWZhdWx0X3ByZWZpeCA9ICdtaCdcblxuICAgIC8vIENyZWF0ZSBhIHN0b3JlIGZvciBkZWJ1Z3MsIHNvIGl0IGNhbiBiZSBwb3NzaWJsZSB0byByZXRyb2FjdGl2ZWx5IFxuICAgIC8vIGVuYWJsZS9kaXNhYmxlIHRoZSBub29wIHRvIGF2b2lkIGFmdGVyIHN0YXJ0dXAuIFxuICAgIC8vIFRoaXMgaXMgdG8gYXZvaWQgdGhlIHRoZSBgZGVidWdgIGZ1bmN0aW9uIGNhbGwgb3ZlcmhlYWRcbiAgICB0aGlzLmRlYnVncyA9IHt9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9IFxuXG4gIC8qKlxuICAgKiBDb21wbGV0ZSBzZXR1cCBmb3IgYSBtb2R1bGVcblxuICAgKiBAcGFyYW0ge0NsYXNzfSAgY2xzIC0gQ2xhc3MgdG8gYXR0YWNoIGRlYnVnIHRvXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggLSBkZWJ1ZyBuYW1lc3BhY2UgcHJlZml4XG4gICAqL1xuICBzdGF0aWMgc2V0dXAoIGNscywgcHJlZml4ICl7XG4gICAgY29uc3QgYV9kZWJ1ZyA9IG5ldyB0aGlzKCBwcmVmaXggKVxuICAgIGFfZGVidWcuYXR0YWNoKGNscylcbiAgICByZXR1cm4gYV9kZWJ1Z1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dGVuZCB0aGlzIGNsYXNzIHRvIGluY2x1ZGUgYSBjdXN0b20gcHJlZml4IGZvciBhbiBleHRlcm5hbFxuICAgKiBtb2R1bGUgdG8gdXNlLiBcblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gZGVidWcgbmFtZXNwYWNlIHByZWZpeFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIEphdmFzY3JpcHQgbmFtZSBvZiB0aGUgY2xhc3NcbiAgICogQHJldHVybiB7Q2xhc3N9IFRoZSBleHRlbmRlZCBDbGFzc0RlYnVnIGNsYXNzXG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKCBwcmVmaXgsIG5hbWUgPSAnRGVidWcnICl7XG4gICAgbGV0IGNsYXNzZXMgPSB7fVxuICAgIGNsYXNzZXNbbmFtZV0gPSBjbGFzcyBleHRlbmRzIHRoaXMge31cbiAgICAvL19EZWJ1Zy5uYW1lID0gbmFtZVxuICAgIGNsYXNzZXNbbmFtZV0uZGVmYXVsdF9wcmVmaXggPSBwcmVmaXhcbiAgICByZXR1cm4gY2xhc3Nlc1tuYW1lXVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGRlYnVnIG5hbWVzcGFjZSB0byBhIGNsYXNzXG5cbiAgICogQHBhcmFtIHtDbGFzc30gIGNscyAtIENsYXNzIHRvIGF0dGFjaCBkZWJ1ZyB0b1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gZGVidWcgbmFtZXNwYWNlIHByZWZpeFxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3VmZml4IC0gZGVidWcgbmFtZXNwYWNlIHN1ZmZpeCwgZGVmYXVsdHMgdG8gdGhlIGNsYXNzIG5hbWVcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgbmFtZXNwYWNlZCBkZWJ1ZyBmdW5jdGlvblxuICAqL1xuICBzdGF0aWMgYXR0YWNoKCBjbHMsIHByZWZpeCwgc3VmZml4ICl7XG5cbiAgICBpZiAoIHByZWZpeCA9PT0gdW5kZWZpbmVkIHx8IHByZWZpeCA9PT0gbnVsbCApIHtcbiAgICAgIHByZWZpeCA9IHRoaXMuZGVmYXVsdF9wcmVmaXhcbiAgICB9XG4gICAgaWYgKCBzdWZmaXggPT09IHVuZGVmaW5lZCB8fCBzdWZmaXggPT09IG51bGwgKSB7XG4gICAgICBzdWZmaXggPSBjbHMubmFtZVxuICAgIH1cbiAgICBsZXQgdGFnID0gYCR7cHJlZml4fToke3N1ZmZpeH1gXG4gICAgZGVidWcoJ0F0dGFjaGluZyBkZWJ1ZyBcIiVzXCIgdG8gY2xhc3MgJXMnLCB0YWcsIGNscy5uYW1lKVxuICAgIGxldCBjbHNfZGVidWcgPSBkZWJ1Z3IodGFnKVxuXG4gICAgY2xzLnByb3RvdHlwZS5kZWJ1Z3IgPSBjbHNfZGVidWdcbiAgICBjbHMucHJvdG90eXBlLmRlYnVnID0gKGNsc19kZWJ1Zy5lbmFibGVkKSA/IGNsc19kZWJ1ZyA6IG5vb3BcbiAgICBjbHMuZGVidWdyID0gY2xzX2RlYnVnXG4gICAgY2xzLmRlYnVnID0gKGNsc19kZWJ1Zy5lbmFibGVkKSA/IGNsc19kZWJ1ZyA6IG5vb3BcbiAgICByZXR1cm4gdGhpcy5kZWJ1Z3NbdGFnXSA9IGNsc19kZWJ1Z1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGRlYnVnIHRvIGEgY2xhc3MgaW5zdGFuY2UsIHdpdGggb3B0aW9uYWwgYFtkYXRhXWAgYWZ0ZXIgdGhlIGBwcmVmaXg6c3VmZml4YFxuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpbnN0YW5jZSAtIEEgY2xhc3MgaW5zdGFuY2UgdG8gYXR0YWNoIGRlYnVnIHRvXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggLSBkZWJ1ZyBuYW1lc3BhY2UgcHJlZml4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhIC0gZGVidWcgbmFtZXNwYWNlIGRhdGEgKGFmdGVyIHN1ZmZpeClcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgbmFtZXNwYWNlZCBkZWJ1ZyBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIGluc3RhbmNlKCBpbnN0YW5jZSwgcHJlZml4LCBkYXRhICl7XG4gICAgbGV0IGNscyA9IGluc3RhbmNlLmNvbnN0cnVjdG9yXG4gICAgZGVidWcoJ0F0dGFjaGluZyBkZWJ1ZyBcIiVzXCIgdG8gY2xhc3MgXCIlc1wiIGluc3RhbmNlIHdpdGggZGF0YSBcIiVzXCInLCBwcmVmaXgsIGNscy5uYW1lLCBkYXRhKVxuXG4gICAgcHJlZml4ID0gcHJlZml4IHx8IHRoaXMuZGVmYXVsdF9wcmVmaXhcbiAgICBsZXQgdGFnID0gYCR7cHJlZml4fToke2Nscy5uYW1lfWBcbiAgICBpZiAoZGF0YSkgdGFnICs9IGBbJHtkYXRhfV1gXG5cbiAgICBsZXQgY2xzX2RlYnVnID0gZGVidWdyKHRhZylcbiAgICBpbnN0YW5jZS5kZWJ1Z3IgPSBjbHNfZGVidWdcbiAgICBpbnN0YW5jZS5kZWJ1ZyA9IChjbHNfZGVidWcuZW5hYmxlZCkgPyBjbHNfZGVidWcgOiBub29wXG4gICAgcmV0dXJuIHRoaXMuZGVidWdzW3RhZ10gPSBjbHNfZGVidWdcbiAgfVxuXG4gIFxuICAvKipcbiAgICogQ3JlYXRlIGEgZGVidWcgaW5zdGFuY2Ugd2l0aCBhIHNldCBwcmVmaXhcblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gZGVidWcgbmFtZXNwYWNlIHByZWZpeFxuICAgKi9cbiAgY29uc3RydWN0b3IoIHByZWZpeCApe1xuICAgIHRoaXMucHJlZml4ID0gcHJlZml4IHx8IHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdF9wcmVmaXhcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBkZWJ1ZyBuYW1lc3BhY2UgdG8gYSBjbGFzczogYHByZWZpeDpzdWZmaXhgXG4gICAqXG4gICAqIEBwYXJhbSB7Q2xhc3N9ICBjbHMgLSBDbGFzcyB0byBhdHRhY2ggZGVidWcgdG9cbiAgICogQHBhcmFtIHtzdHJpbmd9IHN1ZmZpeCAtIGRlYnVnIG5hbWVzcGFjZSBzdWZmaXgsIGRlZmF1bHRzIHRvIHRoZSBjbGFzcyBuYW1lXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhlIG5hbWVzcGFjZWQgZGVidWcgZnVuY3Rpb25cbiAgKi9cbiAgYXR0YWNoKCBjbHMsIHN1ZmZpeCApe1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmF0dGFjaChjbHMsIHRoaXMucHJlZml4LCBzdWZmaXgpXG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgZGVidWcgbmFtZXNwYWNlIHRvIGEgY2xhc3MgaW5zdGFuY2UsIHdpdGggb3B0aW9uYWw6IGBwcmVmaXg6c3VmZml4W2RhdGFdYFxuICAgKlxuICAgKiBAcGFyYW0ge0NsYXNzfSAgY2xzIC0gQ2xhc3MgdG8gYXR0YWNoIGRlYnVnIHRvXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhIC0gZGVidWcgbmFtZXNwYWNlIGRhdGEsIGRlZmF1bHRzIHRvIHRoZSBjbGFzcyBuYW1lXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhlIG5hbWVzcGFjZWQgZGVidWcgZnVuY3Rpb25cbiAgKi9cbiAgaW5zdGFuY2UoIGluc3RhbmNlLCBkYXRhICl7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuaW5zdGFuY2UoaW5zdGFuY2UsIHRoaXMucHJlZml4LCBkYXRhKVxuICB9XG5cbn1cblxuQ2xhc3NEZWJ1Zy5jbGFzc0luaXQoKVxuXG5leHBvcnQgZGVmYXVsdCBDbGFzc0RlYnVnIl19