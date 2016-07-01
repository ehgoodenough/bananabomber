import microajax from "microajax"

microajax("./stats.json", function(ajax) {
    var stats = JSON.parse(ajax.response)

    stats.warnings.forEach((warning) => {
        console.warn(warning)
    })

    stats.errors.forEach((error) => {
        console.error(error)
    })
})
