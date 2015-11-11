_ = require 'lodash'

describe "Util Lodash (Enhancement)", ->
  it "should assign / merge but without defaultValues with defaultAssign", ->
    startObj =
      user: 'test'

    mergeObj =
      age: 18

    assignObj =
      user: 'otherTest'

    # normal assign will result this {user: 'otherTest', age: 18}
    resultObj = _.assign {}, startObj, mergeObj, assignObj
    resultObj.should.be.eql
      user: 'otherTest'
      age: 18

    # now the defaultAssign (will result this {user: 'test', age: 18})
    resultObj = Utils.lodash.defaultAssign {}, startObj, mergeObj, assignObj
    resultObj.should.be.eql
      user: 'test'
      age: 18
