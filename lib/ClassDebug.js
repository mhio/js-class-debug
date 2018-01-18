'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug2.default)('mh:class-debug');
const noop = function () {};

class ClassDebug {

  static classInit() {
    // Set a generic prefix undefined
    this.default_prefix = 'mh';

    // Create a store for debugs, so it can be possible to retroactively 
    // enable/disable the noop to avoid after startup. 
    // This is to avoid the the `debug` function call overhead
    this.debugs = {};
  }

  // Complete setup for a module
  static setup(cls, prefix) {
    const _Debug = new this(prefix);
    _Debug.attach(cls);
    return _Debug;
  }

  // Extend this class to include a custom prefix for a module
  // static extend( prefix, name = 'Debug' ){
  //   let classes = {}
  //   classes[name] = class extends this {}
  //   //_Debug.name = name
  //   classes[name].default_prefix = prefix
  //   return classes[name]
  // }

  // Attach debug to a class
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

  // Attach a debug to a class instance, with optional [data]
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

  // Create a debug instance with a set prefix
  constructor(prefix) {
    this.prefix = prefix || this.constructor.default_prefix;
  }

  // Attach this debug to a class
  attach(cls) {
    return this.constructor.attach(cls, this.prefix);
  }

  // Attach this debug to a class instance, with optional [data]
  instance(instance, data) {
    return this.constructor.instance(instance, this.prefix, data);
  }

}

exports.default = ClassDebug;
ClassDebug.classInit();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DbGFzc0RlYnVnLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwibm9vcCIsIkNsYXNzRGVidWciLCJjbGFzc0luaXQiLCJkZWZhdWx0X3ByZWZpeCIsImRlYnVncyIsInNldHVwIiwiY2xzIiwicHJlZml4IiwiX0RlYnVnIiwiYXR0YWNoIiwic3VmZml4IiwidW5kZWZpbmVkIiwibmFtZSIsInRhZyIsImNsc19kZWJ1ZyIsInByb3RvdHlwZSIsImRlYnVnciIsImVuYWJsZWQiLCJpbnN0YW5jZSIsImRhdGEiLCJjb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7Ozs7OztBQUNBLE1BQU1BLFFBQVEscUJBQU8sZ0JBQVAsQ0FBZDtBQUNBLE1BQU1DLE9BQU8sWUFBVSxDQUFFLENBQXpCOztBQUdlLE1BQU1DLFVBQU4sQ0FBaUI7O0FBRTlCLFNBQU9DLFNBQVAsR0FBa0I7QUFDaEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLElBQXRCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0Q7O0FBRUQ7QUFDQSxTQUFPQyxLQUFQLENBQWNDLEdBQWQsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQ3pCLFVBQU1DLFNBQVMsSUFBSSxJQUFKLENBQVVELE1BQVYsQ0FBZjtBQUNBQyxXQUFPQyxNQUFQLENBQWNILEdBQWQ7QUFDQSxXQUFPRSxNQUFQO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQU9DLE1BQVAsQ0FBZUgsR0FBZixFQUFvQkMsTUFBcEIsRUFBNEJHLE1BQTVCLEVBQW9DOztBQUVsQyxRQUFLSCxXQUFXSSxTQUFYLElBQXdCSixXQUFXLElBQXhDLEVBQStDO0FBQzdDQSxlQUFTLEtBQUtKLGNBQWQ7QUFDRDtBQUNELFFBQUtPLFdBQVdDLFNBQVgsSUFBd0JELFdBQVcsSUFBeEMsRUFBK0M7QUFDN0NBLGVBQVNKLElBQUlNLElBQWI7QUFDRDtBQUNELFFBQUlDLE1BQU8sR0FBRU4sTUFBTyxJQUFHRyxNQUFPLEVBQTlCO0FBQ0FYLFVBQU0sa0NBQU4sRUFBMENjLEdBQTFDLEVBQStDUCxJQUFJTSxJQUFuRDtBQUNBLFFBQUlFLFlBQVkscUJBQU9ELEdBQVAsQ0FBaEI7O0FBRUFQLFFBQUlTLFNBQUosQ0FBY0MsTUFBZCxHQUF1QkYsU0FBdkI7QUFDQVIsUUFBSVMsU0FBSixDQUFjaEIsS0FBZCxHQUF1QmUsVUFBVUcsT0FBWCxHQUFzQkgsU0FBdEIsR0FBa0NkLElBQXhEO0FBQ0FNLFFBQUlVLE1BQUosR0FBYUYsU0FBYjtBQUNBUixRQUFJUCxLQUFKLEdBQWFlLFVBQVVHLE9BQVgsR0FBc0JILFNBQXRCLEdBQWtDZCxJQUE5QztBQUNBLFdBQU8sS0FBS0ksTUFBTCxDQUFZUyxHQUFaLElBQW1CQyxTQUExQjtBQUNEOztBQUVEO0FBQ0EsU0FBT0ksUUFBUCxDQUFpQkEsUUFBakIsRUFBMkJYLE1BQTNCLEVBQW1DWSxJQUFuQyxFQUF5QztBQUN2QyxRQUFJYixNQUFNWSxTQUFTRSxXQUFuQjtBQUNBckIsVUFBTSw0REFBTixFQUFvRVEsTUFBcEUsRUFBNEVELElBQUlNLElBQWhGLEVBQXNGTyxJQUF0Rjs7QUFFQVosYUFBU0EsVUFBVSxLQUFLSixjQUF4QjtBQUNBLFFBQUlVLE1BQU8sR0FBRU4sTUFBTyxJQUFHRCxJQUFJTSxJQUFLLEVBQWhDO0FBQ0EsUUFBSU8sSUFBSixFQUFVTixPQUFRLElBQUdNLElBQUssR0FBaEI7O0FBRVYsUUFBSUwsWUFBWSxxQkFBT0QsR0FBUCxDQUFoQjtBQUNBSyxhQUFTRixNQUFULEdBQWtCRixTQUFsQjtBQUNBSSxhQUFTbkIsS0FBVCxHQUFrQmUsVUFBVUcsT0FBWCxHQUFzQkgsU0FBdEIsR0FBa0NkLElBQW5EO0FBQ0EsV0FBTyxLQUFLSSxNQUFMLENBQVlTLEdBQVosSUFBbUJDLFNBQTFCO0FBQ0Q7O0FBR0Q7QUFDQU0sY0FBYWIsTUFBYixFQUFxQjtBQUNuQixTQUFLQSxNQUFMLEdBQWNBLFVBQVUsS0FBS2EsV0FBTCxDQUFpQmpCLGNBQXpDO0FBQ0Q7O0FBRUQ7QUFDQU0sU0FBUUgsR0FBUixFQUFhO0FBQ1gsV0FBTyxLQUFLYyxXQUFMLENBQWlCWCxNQUFqQixDQUF3QkgsR0FBeEIsRUFBNkIsS0FBS0MsTUFBbEMsQ0FBUDtBQUVEOztBQUVEO0FBQ0FXLFdBQVVBLFFBQVYsRUFBb0JDLElBQXBCLEVBQTBCO0FBQ3hCLFdBQU8sS0FBS0MsV0FBTCxDQUFpQkYsUUFBakIsQ0FBMEJBLFFBQTFCLEVBQW9DLEtBQUtYLE1BQXpDLEVBQWlEWSxJQUFqRCxDQUFQO0FBQ0Q7O0FBOUU2Qjs7a0JBQVhsQixVO0FBa0ZyQkEsV0FBV0MsU0FBWCIsImZpbGUiOiJDbGFzc0RlYnVnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgZGVidWdyIGZyb20gJ2RlYnVnJ1xuY29uc3QgZGVidWcgPSBkZWJ1Z3IoJ21oOmNsYXNzLWRlYnVnJylcbmNvbnN0IG5vb3AgPSBmdW5jdGlvbigpe31cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc0RlYnVnIHtcblxuICBzdGF0aWMgY2xhc3NJbml0KCl7XG4gICAgLy8gU2V0IGEgZ2VuZXJpYyBwcmVmaXggdW5kZWZpbmVkXG4gICAgdGhpcy5kZWZhdWx0X3ByZWZpeCA9ICdtaCdcblxuICAgIC8vIENyZWF0ZSBhIHN0b3JlIGZvciBkZWJ1Z3MsIHNvIGl0IGNhbiBiZSBwb3NzaWJsZSB0byByZXRyb2FjdGl2ZWx5IFxuICAgIC8vIGVuYWJsZS9kaXNhYmxlIHRoZSBub29wIHRvIGF2b2lkIGFmdGVyIHN0YXJ0dXAuIFxuICAgIC8vIFRoaXMgaXMgdG8gYXZvaWQgdGhlIHRoZSBgZGVidWdgIGZ1bmN0aW9uIGNhbGwgb3ZlcmhlYWRcbiAgICB0aGlzLmRlYnVncyA9IHt9XG4gIH0gXG5cbiAgLy8gQ29tcGxldGUgc2V0dXAgZm9yIGEgbW9kdWxlXG4gIHN0YXRpYyBzZXR1cCggY2xzLCBwcmVmaXggKXtcbiAgICBjb25zdCBfRGVidWcgPSBuZXcgdGhpcyggcHJlZml4IClcbiAgICBfRGVidWcuYXR0YWNoKGNscylcbiAgICByZXR1cm4gX0RlYnVnXG4gIH1cblxuICAvLyBFeHRlbmQgdGhpcyBjbGFzcyB0byBpbmNsdWRlIGEgY3VzdG9tIHByZWZpeCBmb3IgYSBtb2R1bGVcbiAgLy8gc3RhdGljIGV4dGVuZCggcHJlZml4LCBuYW1lID0gJ0RlYnVnJyApe1xuICAvLyAgIGxldCBjbGFzc2VzID0ge31cbiAgLy8gICBjbGFzc2VzW25hbWVdID0gY2xhc3MgZXh0ZW5kcyB0aGlzIHt9XG4gIC8vICAgLy9fRGVidWcubmFtZSA9IG5hbWVcbiAgLy8gICBjbGFzc2VzW25hbWVdLmRlZmF1bHRfcHJlZml4ID0gcHJlZml4XG4gIC8vICAgcmV0dXJuIGNsYXNzZXNbbmFtZV1cbiAgLy8gfVxuXG4gIC8vIEF0dGFjaCBkZWJ1ZyB0byBhIGNsYXNzXG4gIHN0YXRpYyBhdHRhY2goIGNscywgcHJlZml4LCBzdWZmaXggKXtcblxuICAgIGlmICggcHJlZml4ID09PSB1bmRlZmluZWQgfHwgcHJlZml4ID09PSBudWxsICkge1xuICAgICAgcHJlZml4ID0gdGhpcy5kZWZhdWx0X3ByZWZpeFxuICAgIH1cbiAgICBpZiAoIHN1ZmZpeCA9PT0gdW5kZWZpbmVkIHx8IHN1ZmZpeCA9PT0gbnVsbCApIHtcbiAgICAgIHN1ZmZpeCA9IGNscy5uYW1lXG4gICAgfVxuICAgIGxldCB0YWcgPSBgJHtwcmVmaXh9OiR7c3VmZml4fWBcbiAgICBkZWJ1ZygnQXR0YWNoaW5nIGRlYnVnIFwiJXNcIiB0byBjbGFzcyAlcycsIHRhZywgY2xzLm5hbWUpXG4gICAgbGV0IGNsc19kZWJ1ZyA9IGRlYnVncih0YWcpXG5cbiAgICBjbHMucHJvdG90eXBlLmRlYnVnciA9IGNsc19kZWJ1Z1xuICAgIGNscy5wcm90b3R5cGUuZGVidWcgPSAoY2xzX2RlYnVnLmVuYWJsZWQpID8gY2xzX2RlYnVnIDogbm9vcFxuICAgIGNscy5kZWJ1Z3IgPSBjbHNfZGVidWdcbiAgICBjbHMuZGVidWcgPSAoY2xzX2RlYnVnLmVuYWJsZWQpID8gY2xzX2RlYnVnIDogbm9vcFxuICAgIHJldHVybiB0aGlzLmRlYnVnc1t0YWddID0gY2xzX2RlYnVnXG4gIH1cblxuICAvLyBBdHRhY2ggYSBkZWJ1ZyB0byBhIGNsYXNzIGluc3RhbmNlLCB3aXRoIG9wdGlvbmFsIFtkYXRhXVxuICBzdGF0aWMgaW5zdGFuY2UoIGluc3RhbmNlLCBwcmVmaXgsIGRhdGEgKXtcbiAgICBsZXQgY2xzID0gaW5zdGFuY2UuY29uc3RydWN0b3JcbiAgICBkZWJ1ZygnQXR0YWNoaW5nIGRlYnVnIFwiJXNcIiB0byBjbGFzcyBcIiVzXCIgaW5zdGFuY2Ugd2l0aCBkYXRhIFwiJXNcIicsIHByZWZpeCwgY2xzLm5hbWUsIGRhdGEpXG5cbiAgICBwcmVmaXggPSBwcmVmaXggfHwgdGhpcy5kZWZhdWx0X3ByZWZpeFxuICAgIGxldCB0YWcgPSBgJHtwcmVmaXh9OiR7Y2xzLm5hbWV9YFxuICAgIGlmIChkYXRhKSB0YWcgKz0gYFske2RhdGF9XWBcblxuICAgIGxldCBjbHNfZGVidWcgPSBkZWJ1Z3IodGFnKVxuICAgIGluc3RhbmNlLmRlYnVnciA9IGNsc19kZWJ1Z1xuICAgIGluc3RhbmNlLmRlYnVnID0gKGNsc19kZWJ1Zy5lbmFibGVkKSA/IGNsc19kZWJ1ZyA6IG5vb3BcbiAgICByZXR1cm4gdGhpcy5kZWJ1Z3NbdGFnXSA9IGNsc19kZWJ1Z1xuICB9XG5cbiAgXG4gIC8vIENyZWF0ZSBhIGRlYnVnIGluc3RhbmNlIHdpdGggYSBzZXQgcHJlZml4XG4gIGNvbnN0cnVjdG9yKCBwcmVmaXggKXtcbiAgICB0aGlzLnByZWZpeCA9IHByZWZpeCB8fCB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRfcHJlZml4XG4gIH1cblxuICAvLyBBdHRhY2ggdGhpcyBkZWJ1ZyB0byBhIGNsYXNzXG4gIGF0dGFjaCggY2xzICl7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuYXR0YWNoKGNscywgdGhpcy5wcmVmaXgpXG4gICAgXG4gIH1cblxuICAvLyBBdHRhY2ggdGhpcyBkZWJ1ZyB0byBhIGNsYXNzIGluc3RhbmNlLCB3aXRoIG9wdGlvbmFsIFtkYXRhXVxuICBpbnN0YW5jZSggaW5zdGFuY2UsIGRhdGEgKXtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5pbnN0YW5jZShpbnN0YW5jZSwgdGhpcy5wcmVmaXgsIGRhdGEpXG4gIH1cblxufVxuXG5DbGFzc0RlYnVnLmNsYXNzSW5pdCgpXG4iXX0=