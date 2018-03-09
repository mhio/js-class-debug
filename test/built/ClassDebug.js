/* global expect */

const def = require('../../')
const { ClassDebug } = def

describe('mh::test::Unit::ClassDebug', function(){

  it('should load the default module', function(){
    expect( def ).to.be.ok
  })

  it('should have an attach function on default', function(){
    expect( def.attach ).to.be.a('function')
  })

  it('should load the module', function(){
    expect( ClassDebug ).to.be.ok
  })

  it('should have an attach function', function(){
    expect( ClassDebug.attach ).to.be.a('function')
  })

  it('should have an instance function', function(){
    expect( ClassDebug.instance ).to.be.a('function')
  })

})
