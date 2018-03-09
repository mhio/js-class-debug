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

/** Class to manage debug on other classes */
class ClassDebug {

  // Initialise the class
  static classInit() {
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
ClassDebug.classInit();

exports.default = ClassDebug;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DbGFzc0RlYnVnLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwibm9vcCIsIkNsYXNzRGVidWciLCJjbGFzc0luaXQiLCJkZWZhdWx0X3ByZWZpeCIsImRlYnVncyIsInNldHVwIiwiY2xzIiwicHJlZml4IiwiYV9kZWJ1ZyIsImF0dGFjaCIsImV4dGVuZCIsIm5hbWUiLCJjbGFzc2VzIiwic3VmZml4IiwidW5kZWZpbmVkIiwidGFnIiwiY2xzX2RlYnVnIiwicHJvdG90eXBlIiwiZGVidWdyIiwiZW5hYmxlZCIsImluc3RhbmNlIiwiZGF0YSIsImNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7OztBQUNBLE1BQU1BLFFBQVEscUJBQU8sZ0JBQVAsQ0FBZDtBQUNBLE1BQU1DLE9BQU8sU0FBUEEsSUFBTyxHQUFVLENBQUUsQ0FBekI7O0FBRUE7QUFDTyxNQUFNQyxVQUFOLENBQWlCOztBQUV0QjtBQUNBLFNBQU9DLFNBQVAsR0FBa0I7QUFDaEI7Ozs7OztBQU1BLFNBQUtDLGNBQUwsR0FBc0IsSUFBdEI7O0FBRUEsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7O0FBRUEsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsU0FBT0MsS0FBUCxDQUFjQyxHQUFkLEVBQW1CQyxNQUFuQixFQUEyQjtBQUN6QixVQUFNQyxVQUFVLElBQUksSUFBSixDQUFVRCxNQUFWLENBQWhCO0FBQ0FDLFlBQVFDLE1BQVIsQ0FBZUgsR0FBZjtBQUNBLFdBQU9FLE9BQVA7QUFDRDs7QUFFRDs7Ozs7O0FBTUEsU0FBT0UsTUFBUCxDQUFlSCxNQUFmLEVBQXVCSSxPQUFPLE9BQTlCLEVBQXVDO0FBQ3JDLFFBQUlDLFVBQVUsRUFBZDtBQUNBQSxZQUFRRCxJQUFSLElBQWdCLGNBQWMsSUFBZCxDQUFtQixFQUFuQztBQUNBO0FBQ0FDLFlBQVFELElBQVIsRUFBY1IsY0FBZCxHQUErQkksTUFBL0I7QUFDQSxXQUFPSyxRQUFRRCxJQUFSLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7QUFRQSxTQUFPRixNQUFQLENBQWVILEdBQWYsRUFBb0JDLE1BQXBCLEVBQTRCTSxNQUE1QixFQUFvQzs7QUFFbEMsUUFBS04sV0FBV08sU0FBWCxJQUF3QlAsV0FBVyxJQUF4QyxFQUErQztBQUM3Q0EsZUFBUyxLQUFLSixjQUFkO0FBQ0Q7QUFDRCxRQUFLVSxXQUFXQyxTQUFYLElBQXdCRCxXQUFXLElBQXhDLEVBQStDO0FBQzdDQSxlQUFTUCxJQUFJSyxJQUFiO0FBQ0Q7QUFDRCxRQUFJSSxNQUFPLEdBQUVSLE1BQU8sSUFBR00sTUFBTyxFQUE5QjtBQUNBZCxVQUFNLGtDQUFOLEVBQTBDZ0IsR0FBMUMsRUFBK0NULElBQUlLLElBQW5EO0FBQ0EsUUFBSUssWUFBWSxxQkFBT0QsR0FBUCxDQUFoQjs7QUFFQVQsUUFBSVcsU0FBSixDQUFjQyxNQUFkLEdBQXVCRixTQUF2QjtBQUNBVixRQUFJVyxTQUFKLENBQWNsQixLQUFkLEdBQXVCaUIsVUFBVUcsT0FBWCxHQUFzQkgsU0FBdEIsR0FBa0NoQixJQUF4RDtBQUNBTSxRQUFJWSxNQUFKLEdBQWFGLFNBQWI7QUFDQVYsUUFBSVAsS0FBSixHQUFhaUIsVUFBVUcsT0FBWCxHQUFzQkgsU0FBdEIsR0FBa0NoQixJQUE5QztBQUNBLFdBQU8sS0FBS0ksTUFBTCxDQUFZVyxHQUFaLElBQW1CQyxTQUExQjtBQUNEOztBQUVEOzs7Ozs7OztBQVFBLFNBQU9JLFFBQVAsQ0FBaUJBLFFBQWpCLEVBQTJCYixNQUEzQixFQUFtQ2MsSUFBbkMsRUFBeUM7QUFDdkMsUUFBSWYsTUFBTWMsU0FBU0UsV0FBbkI7QUFDQXZCLFVBQU0sNERBQU4sRUFBb0VRLE1BQXBFLEVBQTRFRCxJQUFJSyxJQUFoRixFQUFzRlUsSUFBdEY7O0FBRUFkLGFBQVNBLFVBQVUsS0FBS0osY0FBeEI7QUFDQSxRQUFJWSxNQUFPLEdBQUVSLE1BQU8sSUFBR0QsSUFBSUssSUFBSyxFQUFoQztBQUNBLFFBQUlVLElBQUosRUFBVU4sT0FBUSxJQUFHTSxJQUFLLEdBQWhCOztBQUVWLFFBQUlMLFlBQVkscUJBQU9ELEdBQVAsQ0FBaEI7QUFDQUssYUFBU0YsTUFBVCxHQUFrQkYsU0FBbEI7QUFDQUksYUFBU3JCLEtBQVQsR0FBa0JpQixVQUFVRyxPQUFYLEdBQXNCSCxTQUF0QixHQUFrQ2hCLElBQW5EO0FBQ0EsV0FBTyxLQUFLSSxNQUFMLENBQVlXLEdBQVosSUFBbUJDLFNBQTFCO0FBQ0Q7O0FBR0Q7Ozs7O0FBS0FNLGNBQWFmLE1BQWIsRUFBcUI7QUFDbkIsU0FBS0EsTUFBTCxHQUFjQSxVQUFVLEtBQUtlLFdBQUwsQ0FBaUJuQixjQUF6QztBQUNEOztBQUVEOzs7Ozs7O0FBT0FNLFNBQVFILEdBQVIsRUFBYU8sTUFBYixFQUFxQjtBQUNuQixXQUFPLEtBQUtTLFdBQUwsQ0FBaUJiLE1BQWpCLENBQXdCSCxHQUF4QixFQUE2QixLQUFLQyxNQUFsQyxFQUEwQ00sTUFBMUMsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7O0FBT0FPLFdBQVVBLFFBQVYsRUFBb0JDLElBQXBCLEVBQTBCO0FBQ3hCLFdBQU8sS0FBS0MsV0FBTCxDQUFpQkYsUUFBakIsQ0FBMEJBLFFBQTFCLEVBQW9DLEtBQUtiLE1BQXpDLEVBQWlEYyxJQUFqRCxDQUFQO0FBQ0Q7O0FBekhxQjs7UUFBWHBCLFUsR0FBQUEsVTtBQTZIYkEsV0FBV0MsU0FBWDs7a0JBRWVELFUiLCJmaWxlIjoiQ2xhc3NEZWJ1Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IGRlYnVnciBmcm9tICdkZWJ1ZydcbmNvbnN0IGRlYnVnID0gZGVidWdyKCdtaDpjbGFzcy1kZWJ1ZycpXG5jb25zdCBub29wID0gZnVuY3Rpb24oKXt9XG5cbi8qKiBDbGFzcyB0byBtYW5hZ2UgZGVidWcgb24gb3RoZXIgY2xhc3NlcyAqL1xuZXhwb3J0IGNsYXNzIENsYXNzRGVidWcge1xuXG4gIC8vIEluaXRpYWxpc2UgdGhlIGNsYXNzXG4gIHN0YXRpYyBjbGFzc0luaXQoKXtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlIENsYXNzRGVidWdcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gZGVmYXVsdF9wcmVmaXggLSBTZXQgYSBnZW5lcmljIHByZWZpeCB2YXIsIHNvIHVzZXJzIGNhbiBzdWJjbGFzcyBpbiB0aGUgdGhlaXIgYXBwIChzZWUge0BsaW5rIENsYXNzRGVidWcuZXh0ZW5kfSlcbiAgICAgKiBAcHJvcGVydHkge29iamVjdH0gZGVidWdzIC0gQSBzdG9yZSBmb3IgdGhlIGRlYnVncywgc28gaXQgY2FuIGJlIHBvc3NpYmxlIHRvIHJldHJvYWN0aXZlbHkgZW5hYmxlL2Rpc2FibGUgdGhlIG5vb3AgYWZ0ZXIgc3RhcnR1cC4gVGhpcyBpcyB0byBhdm9pZCB0aGUgdGhlIGBkZWJ1Z2AgZnVuY3Rpb24gY2FsbCBvdmVyaGVhZFxuICAgICovXG5cbiAgICB0aGlzLmRlZmF1bHRfcHJlZml4ID0gJ21oJ1xuXG4gICAgdGhpcy5kZWJ1Z3MgPSB7fVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfSBcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIENvbXBsZXRlIHNldHVwIGZvciBhIG1vZHVsZVxuICAgKiBAcGFyYW0ge0NsYXNzfSAgY2xzIC0gQ2xhc3MgdG8gYXR0YWNoIGRlYnVnIHRvXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggLSBkZWJ1ZyBuYW1lc3BhY2UgcHJlZml4XG4gICAqL1xuICBzdGF0aWMgc2V0dXAoIGNscywgcHJlZml4ICl7XG4gICAgY29uc3QgYV9kZWJ1ZyA9IG5ldyB0aGlzKCBwcmVmaXggKVxuICAgIGFfZGVidWcuYXR0YWNoKGNscylcbiAgICByZXR1cm4gYV9kZWJ1Z1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBFeHRlbmQgdGhpcyBjbGFzcyB0byBpbmNsdWRlIGEgY3VzdG9tIGRlZmF1bHQgcHJlZml4IGZvciBhbiBleHRlcm5hbCBtb2R1bGUgdG8gdXNlLiBcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCAtIGRlYnVnIG5hbWVzcGFjZSBwcmVmaXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBKYXZhc2NyaXB0IG5hbWUgb2YgdGhlIGNsYXNzXG4gICAqIEByZXR1cm4ge0NsYXNzfSBUaGUgZXh0ZW5kZWQgQ2xhc3NEZWJ1ZyBjbGFzc1xuICAgKi9cbiAgc3RhdGljIGV4dGVuZCggcHJlZml4LCBuYW1lID0gJ0RlYnVnJyApe1xuICAgIGxldCBjbGFzc2VzID0ge31cbiAgICBjbGFzc2VzW25hbWVdID0gY2xhc3MgZXh0ZW5kcyB0aGlzIHt9XG4gICAgLy9fRGVidWcubmFtZSA9IG5hbWVcbiAgICBjbGFzc2VzW25hbWVdLmRlZmF1bHRfcHJlZml4ID0gcHJlZml4XG4gICAgcmV0dXJuIGNsYXNzZXNbbmFtZV1cbiAgfVxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBBdHRhY2ggYSBkZWJ1ZyB0byBhIGNsYXNzXG4gICAqIEBkZXNjcmlwdGlvbiBBdHRhY2hlcyBhIGRlYnVnIG5hbWVzcGFjZSB3aXRoIHRoZSBmb3JtYXQgYHByZWZpeDpzdWZmaXhgIHRvIGEgY2xhc3MgYW5kIGl0J3MgcHJvdG90eXBlIGF0IGAuZGVidWdgIGFuZCBgLmRlYnVncmAuXG4gICAqIEBwYXJhbSB7Q2xhc3N9ICBjbHMgLSBDbGFzcyB0byBhdHRhY2ggZGVidWcgdG9cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCAtIGRlYnVnIG5hbWVzcGFjZSBwcmVmaXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN1ZmZpeCAtIGRlYnVnIG5hbWVzcGFjZSBzdWZmaXgsIGRlZmF1bHRzIHRvIHRoZSBjbGFzcyBuYW1lXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhlIG5hbWVzcGFjZWQgZGVidWcgZnVuY3Rpb25cbiAgKi9cbiAgc3RhdGljIGF0dGFjaCggY2xzLCBwcmVmaXgsIHN1ZmZpeCApe1xuXG4gICAgaWYgKCBwcmVmaXggPT09IHVuZGVmaW5lZCB8fCBwcmVmaXggPT09IG51bGwgKSB7XG4gICAgICBwcmVmaXggPSB0aGlzLmRlZmF1bHRfcHJlZml4XG4gICAgfVxuICAgIGlmICggc3VmZml4ID09PSB1bmRlZmluZWQgfHwgc3VmZml4ID09PSBudWxsICkge1xuICAgICAgc3VmZml4ID0gY2xzLm5hbWVcbiAgICB9XG4gICAgbGV0IHRhZyA9IGAke3ByZWZpeH06JHtzdWZmaXh9YFxuICAgIGRlYnVnKCdBdHRhY2hpbmcgZGVidWcgXCIlc1wiIHRvIGNsYXNzICVzJywgdGFnLCBjbHMubmFtZSlcbiAgICBsZXQgY2xzX2RlYnVnID0gZGVidWdyKHRhZylcblxuICAgIGNscy5wcm90b3R5cGUuZGVidWdyID0gY2xzX2RlYnVnXG4gICAgY2xzLnByb3RvdHlwZS5kZWJ1ZyA9IChjbHNfZGVidWcuZW5hYmxlZCkgPyBjbHNfZGVidWcgOiBub29wXG4gICAgY2xzLmRlYnVnciA9IGNsc19kZWJ1Z1xuICAgIGNscy5kZWJ1ZyA9IChjbHNfZGVidWcuZW5hYmxlZCkgPyBjbHNfZGVidWcgOiBub29wXG4gICAgcmV0dXJuIHRoaXMuZGVidWdzW3RhZ10gPSBjbHNfZGVidWdcbiAgfVxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBBdHRhY2ggYSBkZWJ1ZyB0byBhIGNsYXNzIGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBBdHRhY2ggYSBkZWJ1ZyBuYW1lc3BhY2UgdG8gYSBjbGFzcyBpbnN0YW5jZSwgd2l0aCBvcHRpb25hbCBgW2RhdGFdYCBhZnRlciB0aGUgYHByZWZpeDpzdWZmaXhgXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpbnN0YW5jZSAtIEEgY2xhc3MgaW5zdGFuY2UgdG8gYXR0YWNoIGRlYnVnIHRvXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggLSBkZWJ1ZyBuYW1lc3BhY2UgcHJlZml4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhIC0gZGVidWcgbmFtZXNwYWNlIGRhdGEgKGFmdGVyIHN1ZmZpeClcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgbmFtZXNwYWNlZCBkZWJ1ZyBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIGluc3RhbmNlKCBpbnN0YW5jZSwgcHJlZml4LCBkYXRhICl7XG4gICAgbGV0IGNscyA9IGluc3RhbmNlLmNvbnN0cnVjdG9yXG4gICAgZGVidWcoJ0F0dGFjaGluZyBkZWJ1ZyBcIiVzXCIgdG8gY2xhc3MgXCIlc1wiIGluc3RhbmNlIHdpdGggZGF0YSBcIiVzXCInLCBwcmVmaXgsIGNscy5uYW1lLCBkYXRhKVxuXG4gICAgcHJlZml4ID0gcHJlZml4IHx8IHRoaXMuZGVmYXVsdF9wcmVmaXhcbiAgICBsZXQgdGFnID0gYCR7cHJlZml4fToke2Nscy5uYW1lfWBcbiAgICBpZiAoZGF0YSkgdGFnICs9IGBbJHtkYXRhfV1gXG5cbiAgICBsZXQgY2xzX2RlYnVnID0gZGVidWdyKHRhZylcbiAgICBpbnN0YW5jZS5kZWJ1Z3IgPSBjbHNfZGVidWdcbiAgICBpbnN0YW5jZS5kZWJ1ZyA9IChjbHNfZGVidWcuZW5hYmxlZCkgPyBjbHNfZGVidWcgOiBub29wXG4gICAgcmV0dXJuIHRoaXMuZGVidWdzW3RhZ10gPSBjbHNfZGVidWdcbiAgfVxuXG4gIFxuICAvKipcbiAgICogQHN1bW1hcnkgQ3JlYXRlIGEgZGVidWcgaW5zdGFuY2Ugd2l0aCBhIHNldCBwcmVmaXhcbiAgICogQGRlc2NyaXB0aW9uIFRoZSBDbGFzc0RlYnVnIGluc3RhbmNlIG1hbmFnZXMgYSBmaXhlZCBwcmVmaXggZm9yIHRoZSBkZWJ1ZyBuYW1lc3BhY2VzIHlvdSB3YW50IHRvIGF0dGFjaCB0byBvdGhlciBjbGFzc2VzLiBcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCAtIGRlYnVnIG5hbWVzcGFjZSBwcmVmaXhcbiAgICovXG4gIGNvbnN0cnVjdG9yKCBwcmVmaXggKXtcbiAgICB0aGlzLnByZWZpeCA9IHByZWZpeCB8fCB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRfcHJlZml4XG4gIH1cblxuICAvKipcbiAgICogQHN1bW1hcnkgQXR0YWNoIGEgZGVidWcgbmFtZXNwYWNlIHRvIGEgY2xhc3NcbiAgICogQGRlc2NyaXB0aW9uICBBdHRhY2hlcyBhIGRlYnVnIG5hbWVzcGFjZSBvZiB0aGUgZm9ybWF0IGBwcmVmaXg6c3VmZml4YCB0byB0aGUgc3BlY2lmaWVkIGNsYXNzIGF0IGAuZGVidWdgIGFuZCBgLmRlYnVncmAuXG4gICAqIEBwYXJhbSB7Q2xhc3N9ICBjbHMgLSBDbGFzcyB0byBhdHRhY2ggZGVidWcgdG9cbiAgICogQHBhcmFtIHtzdHJpbmd9IHN1ZmZpeCAtIGRlYnVnIG5hbWVzcGFjZSBzdWZmaXgsIGRlZmF1bHRzIHRvIHRoZSBjbGFzcyBuYW1lXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhlIG5hbWVzcGFjZWQgZGVidWcgZnVuY3Rpb25cbiAgKi9cbiAgYXR0YWNoKCBjbHMsIHN1ZmZpeCApe1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmF0dGFjaChjbHMsIHRoaXMucHJlZml4LCBzdWZmaXgpXG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgZGVidWcgbmFtZXNwYWNlIHRvIGEgY2xhc3MgaW5zdGFuY2UsIHdpdGggb3B0aW9uYWwgYFtkYXRhXWAgYWZ0ZXIgdGhlIGBwcmVmaXg6c3VmZml4YFxuICAgKlxuICAgKiBAcGFyYW0ge0NsYXNzfSAgY2xzIC0gQ2xhc3MgdG8gYXR0YWNoIGRlYnVnIHRvXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhIC0gZGVidWcgbmFtZXNwYWNlIGRhdGEsIGRlZmF1bHRzIHRvIHRoZSBjbGFzcyBuYW1lXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhlIG5hbWVzcGFjZWQgZGVidWcgZnVuY3Rpb25cbiAgKi9cbiAgaW5zdGFuY2UoIGluc3RhbmNlLCBkYXRhICl7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuaW5zdGFuY2UoaW5zdGFuY2UsIHRoaXMucHJlZml4LCBkYXRhKVxuICB9XG5cbn1cblxuQ2xhc3NEZWJ1Zy5jbGFzc0luaXQoKVxuXG5leHBvcnQgZGVmYXVsdCBDbGFzc0RlYnVnXG4iXX0=