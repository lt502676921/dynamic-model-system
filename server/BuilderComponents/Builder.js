const Button = require('../BuilderComponents/components/Button')
const FieldBuilder = require('../BuilderComponents/components/FieldBuilder')
const ActionsBuilder = require('../BuilderComponents/components/ActionsBuilder')
const PageBuilder = require('../BuilderComponents/components/PageBuilder')

class Builder {
  page(...params) {
    return new PageBuilder().Page(...params)
  }
  field(...params) {
    return new FieldBuilder().Field(...params)
  }
  actions(...params) {
    return new ActionsBuilder().Actions(...params)
  }
  button(...param) {
    return new Button().Button(...param)
  }
}

module.exports = Builder
