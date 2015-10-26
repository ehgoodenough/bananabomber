class Entity {
    update() {
        return "!"
    }
    render() {
        return {}
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
