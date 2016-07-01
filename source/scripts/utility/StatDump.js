import microajax from "microajax"
import stripansi from "strip-ansi"

microajax("./stats.json", function(ajax) {
    var stats = JSON.parse(ajax.response)

    stats.warnings.forEach((warning) => {
        console.warn(stripansi(warning))
    })

    stats.errors.forEach((error) => {
        console.error(stripansi(error))
    })
})
