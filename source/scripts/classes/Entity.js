class Entity {
    constructor(protoentity) {
        //var entity = this
        //for(var key in protoentity) {
        //    entity[key] = protoentity[key]
        //}
    }
    matches(query) {
        for(var key in query) {
            if(this[key] != query[key]) {
                return false
            }
        }
        return true
    }
}

export default Entity
