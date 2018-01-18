/* global expect */
import ClassDebug from '../../src/ClassDebug'

describe('mh::test::Unit::ClassDebug', function(){

  it('should load the module', function(){
    expect( ClassDebug ).to.be.ok
  })

  it('should have an attach function', function(){
    expect( ClassDebug.attach ).to.be.a('function')
  })

  it('should have an instance function', function(){
    expect( ClassDebug.instance ).to.be.a('function')
  })

  it('should have a setup function', function(){
    expect( ClassDebug.setup ).to.be.a('function')
  })

  xit('should extend a class', function(){
    class Whatever {}
    const whatever = ClassDebug.extend( Whatever )
    expect( whatever ).to.be.a('function')
  })

  it('should setup debug on a class', function(){
    class TestSetup {}
    ClassDebug.setup(TestSetup)
    expect(TestSetup.debug).to.be.a('function')
    expect(TestSetup.debugr).to.be.a('function')
  })

})