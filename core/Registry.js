import Game from './Game.js'

const genEID = () => Math.random().toString(36).substr(2, 9)

class Registry {
  components = {}
  entities = {}

  get list() {
    return Object.values(this.entities)
  }

  add(Component, ...params) {
    const eid = `${Component.name}:${genEID()}`
    
    if (!this.components[Component.name]) {
      this.components[Component.name] = Component
    }
    
    const instance = new Component(...params)
    instance.eid = eid

    this.entities[eid] = instance

    return instance
  }

  find(name) {
    if (!name) return this.list

    return this.list.filter(x => x.constructor.name === name)
  }

  get(name) {
    if (this.entities[name]) {
      return this.entities[name]
    }

    return this.find(name)[0]
  }

  invoke(method, ...params) {
    return this.list.map(e => {
      if (e[method]) {
        e[method](Game.ctx, Game, ...params)
      }
    })
  }
}

const registry = new Registry()

export default registry