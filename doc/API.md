## Classes

<dl>
<dt><a href="#ClassDebug">ClassDebug</a></dt>
<dd><p>Class to manage debug on other classes</p></dd>
</dl>

## Objects

<dl>
<dt><a href="#ClassDebug">ClassDebug</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="ClassDebug"></a>

## ClassDebug
<p>Class to manage debug on other classes</p>

**Kind**: global class  

* [ClassDebug](#ClassDebug)
    * [new exports.ClassDebug(prefix)](#new_ClassDebug_new)
    * _instance_
        * [.attach(cls, suffix)](#ClassDebug+attach) ⇒ <code>object</code>
        * [.instance(cls, data)](#ClassDebug+instance) ⇒ <code>object</code>
    * _static_
        * [.setup(cls, prefix)](#ClassDebug.setup)
        * [.extend(prefix, name)](#ClassDebug.extend) ⇒ <code>Class</code>
        * [.attach(cls, prefix, suffix)](#ClassDebug.attach) ⇒ <code>object</code>
        * [.instance(instance, prefix, data)](#ClassDebug.instance) ⇒ <code>object</code>


* * *

<a name="new_ClassDebug_new"></a>

### new exports.ClassDebug(prefix)
<p>The ClassDebug instance manages a fixed prefix for the debug namespaces you want to attach to other classes.</p>


| Param | Type | Description |
| --- | --- | --- |
| prefix | <code>string</code> | <p>debug namespace prefix</p> |


* * *

<a name="ClassDebug+attach"></a>

### classDebug.attach(cls, suffix) ⇒ <code>object</code>
<p>Attaches a debug namespace of the format <code>prefix:suffix</code> to the specified class at <code>.debug</code> and <code>.debugr</code>.</p>

**Kind**: instance method of [<code>ClassDebug</code>](#ClassDebug)  
**Summary**: <p>Attach a debug namespace to a class</p>  
**Returns**: <code>object</code> - <p>The namespaced debug function</p>  

| Param | Type | Description |
| --- | --- | --- |
| cls | <code>Class</code> | <p>Class to attach debug to</p> |
| suffix | <code>string</code> | <p>debug namespace suffix, defaults to the class name</p> |


* * *

<a name="ClassDebug+instance"></a>

### classDebug.instance(cls, data) ⇒ <code>object</code>
<p>Attach a debug namespace to a class instance, with optional <code>[data]</code> after the <code>prefix:suffix</code></p>

**Kind**: instance method of [<code>ClassDebug</code>](#ClassDebug)  
**Returns**: <code>object</code> - <p>The namespaced debug function</p>  

| Param | Type | Description |
| --- | --- | --- |
| cls | <code>Class</code> | <p>Class to attach debug to</p> |
| data | <code>string</code> | <p>debug namespace data, defaults to the class name</p> |


* * *

<a name="ClassDebug.setup"></a>

### ClassDebug.setup(cls, prefix)
<p>Complete setup for a module</p>

**Kind**: static method of [<code>ClassDebug</code>](#ClassDebug)  

| Param | Type | Description |
| --- | --- | --- |
| cls | <code>Class</code> | <p>Class to attach debug to</p> |
| prefix | <code>string</code> | <p>debug namespace prefix</p> |


* * *

<a name="ClassDebug.extend"></a>

### ClassDebug.extend(prefix, name) ⇒ <code>Class</code>
<p>Extend this class to include a custom default prefix for an external module to use.</p>

**Kind**: static method of [<code>ClassDebug</code>](#ClassDebug)  
**Returns**: <code>Class</code> - <p>The extended ClassDebug class</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| prefix | <code>string</code> |  | <p>debug namespace prefix</p> |
| name | <code>string</code> | <code>&quot;Debug&quot;</code> | <p>Javascript name of the class</p> |


* * *

<a name="ClassDebug.attach"></a>

### ClassDebug.attach(cls, prefix, suffix) ⇒ <code>object</code>
<p>Attaches a debug namespace with the format <code>prefix:suffix</code> to a class and it's prototype at <code>.debug</code> and <code>.debugr</code>.</p>

**Kind**: static method of [<code>ClassDebug</code>](#ClassDebug)  
**Summary**: <p>Attach a debug to a class</p>  
**Returns**: <code>object</code> - <p>The namespaced debug function</p>  

| Param | Type | Description |
| --- | --- | --- |
| cls | <code>Class</code> | <p>Class to attach debug to</p> |
| prefix | <code>string</code> | <p>debug namespace prefix</p> |
| suffix | <code>string</code> | <p>debug namespace suffix, defaults to the class name</p> |


* * *

<a name="ClassDebug.instance"></a>

### ClassDebug.instance(instance, prefix, data) ⇒ <code>object</code>
<p>Attach a debug namespace to a class instance, with optional <code>[data]</code> after the <code>prefix:suffix</code></p>

**Kind**: static method of [<code>ClassDebug</code>](#ClassDebug)  
**Summary**: <p>Attach a debug to a class instance</p>  
**Returns**: <code>object</code> - <p>The namespaced debug function</p>  

| Param | Type | Description |
| --- | --- | --- |
| instance | <code>object</code> | <p>A class instance to attach debug to</p> |
| prefix | <code>string</code> | <p>debug namespace prefix</p> |
| data | <code>string</code> | <p>debug namespace data (after suffix)</p> |


* * *

<a name="ClassDebug"></a>

## ClassDebug : <code>object</code>
**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| default_prefix | <code>string</code> | <p>Set a generic prefix var, so users can subclass in the their app (see [extend](#ClassDebug.extend))</p> |
| debugs | <code>object</code> | <p>A store for the debugs, so it can be possible to retroactively enable/disable the noop after startup. This is to avoid the the <code>debug</code> function call overhead</p> |


* [ClassDebug](#ClassDebug) : <code>object</code>
    * [new exports.ClassDebug(prefix)](#new_ClassDebug_new)
    * _instance_
        * [.attach(cls, suffix)](#ClassDebug+attach) ⇒ <code>object</code>
        * [.instance(cls, data)](#ClassDebug+instance) ⇒ <code>object</code>
    * _static_
        * [.setup(cls, prefix)](#ClassDebug.setup)
        * [.extend(prefix, name)](#ClassDebug.extend) ⇒ <code>Class</code>
        * [.attach(cls, prefix, suffix)](#ClassDebug.attach) ⇒ <code>object</code>
        * [.instance(instance, prefix, data)](#ClassDebug.instance) ⇒ <code>object</code>


* * *

<a name="new_ClassDebug_new"></a>

### new exports.ClassDebug(prefix)
<p>The ClassDebug instance manages a fixed prefix for the debug namespaces you want to attach to other classes.</p>


| Param | Type | Description |
| --- | --- | --- |
| prefix | <code>string</code> | <p>debug namespace prefix</p> |


* * *

<a name="ClassDebug+attach"></a>

### classDebug.attach(cls, suffix) ⇒ <code>object</code>
<p>Attaches a debug namespace of the format <code>prefix:suffix</code> to the specified class at <code>.debug</code> and <code>.debugr</code>.</p>

**Kind**: instance method of [<code>ClassDebug</code>](#ClassDebug)  
**Summary**: <p>Attach a debug namespace to a class</p>  
**Returns**: <code>object</code> - <p>The namespaced debug function</p>  

| Param | Type | Description |
| --- | --- | --- |
| cls | <code>Class</code> | <p>Class to attach debug to</p> |
| suffix | <code>string</code> | <p>debug namespace suffix, defaults to the class name</p> |


* * *

<a name="ClassDebug+instance"></a>

### classDebug.instance(cls, data) ⇒ <code>object</code>
<p>Attach a debug namespace to a class instance, with optional <code>[data]</code> after the <code>prefix:suffix</code></p>

**Kind**: instance method of [<code>ClassDebug</code>](#ClassDebug)  
**Returns**: <code>object</code> - <p>The namespaced debug function</p>  

| Param | Type | Description |
| --- | --- | --- |
| cls | <code>Class</code> | <p>Class to attach debug to</p> |
| data | <code>string</code> | <p>debug namespace data, defaults to the class name</p> |


* * *

<a name="ClassDebug.setup"></a>

### ClassDebug.setup(cls, prefix)
<p>Complete setup for a module</p>

**Kind**: static method of [<code>ClassDebug</code>](#ClassDebug)  

| Param | Type | Description |
| --- | --- | --- |
| cls | <code>Class</code> | <p>Class to attach debug to</p> |
| prefix | <code>string</code> | <p>debug namespace prefix</p> |


* * *

<a name="ClassDebug.extend"></a>

### ClassDebug.extend(prefix, name) ⇒ <code>Class</code>
<p>Extend this class to include a custom default prefix for an external module to use.</p>

**Kind**: static method of [<code>ClassDebug</code>](#ClassDebug)  
**Returns**: <code>Class</code> - <p>The extended ClassDebug class</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| prefix | <code>string</code> |  | <p>debug namespace prefix</p> |
| name | <code>string</code> | <code>&quot;Debug&quot;</code> | <p>Javascript name of the class</p> |


* * *

<a name="ClassDebug.attach"></a>

### ClassDebug.attach(cls, prefix, suffix) ⇒ <code>object</code>
<p>Attaches a debug namespace with the format <code>prefix:suffix</code> to a class and it's prototype at <code>.debug</code> and <code>.debugr</code>.</p>

**Kind**: static method of [<code>ClassDebug</code>](#ClassDebug)  
**Summary**: <p>Attach a debug to a class</p>  
**Returns**: <code>object</code> - <p>The namespaced debug function</p>  

| Param | Type | Description |
| --- | --- | --- |
| cls | <code>Class</code> | <p>Class to attach debug to</p> |
| prefix | <code>string</code> | <p>debug namespace prefix</p> |
| suffix | <code>string</code> | <p>debug namespace suffix, defaults to the class name</p> |


* * *

<a name="ClassDebug.instance"></a>

### ClassDebug.instance(instance, prefix, data) ⇒ <code>object</code>
<p>Attach a debug namespace to a class instance, with optional <code>[data]</code> after the <code>prefix:suffix</code></p>

**Kind**: static method of [<code>ClassDebug</code>](#ClassDebug)  
**Summary**: <p>Attach a debug to a class instance</p>  
**Returns**: <code>object</code> - <p>The namespaced debug function</p>  

| Param | Type | Description |
| --- | --- | --- |
| instance | <code>object</code> | <p>A class instance to attach debug to</p> |
| prefix | <code>string</code> | <p>debug namespace prefix</p> |
| data | <code>string</code> | <p>debug namespace data (after suffix)</p> |


* * *

