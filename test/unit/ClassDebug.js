/* global expect */
import { ClassDebug } from '../../src/ClassDebug'

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

  it('should extend a class', function(){
    const WeDebug = ClassDebug.extend( 'two', 'WeDebug' )
    expect( WeDebug ).to.be.a('function')
  })

  it('should setup debug on a class', function(){
    class TestSetup {}
    ClassDebug.setup(TestSetup)
    expect(TestSetup.debug).to.be.a('function')
    expect(TestSetup.debugr).to.be.a('function')
    TestSetup.debug('class test 1 debug')
    TestSetup.debugr('class test 2 debugr')
  })

  it('should setup debug on a instance', function(){
    class TestSetup {}
    let ts = new TestSetup()
    ClassDebug.instance(ts)
    expect(ts.debug).to.be.a('function')
    expect(ts.debugr).to.be.a('function')
    ts.debug('instance test 1 debug')
    ts.debugr('instance test 2 debugr')
  })

  it('should setup debug on a instance with data', function(){
    class TestSetup {}
    let ts = new TestSetup()
    ClassDebug.instance(ts, null, 'someid')
    expect(ts.debug).to.be.a('function')
    expect(ts.debugr).to.be.a('function')
    ts.debug('instance test 1 debug')
    ts.debugr('instance test 2 debugr')
  })

})
