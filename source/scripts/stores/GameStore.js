var Tile = function(prototile) {
    this.position = prototile.position || {"x": 0, "y": 0}
}

Tile.prototype.getColor = function() {
    if(!!this.wall) {
        return "rgb(80, 80, 80)"
    } else {
        return "rgb(200, 175, 150)"
    }
}

Tile.prototype.hasCollision = function() {
    return !!this.wall
}

var World = function() {
    this.width = 19
    this.height = 13
    
    this.tiles = {}
    for(var x = 0; x < this.width; x++) {
        for(var y = 0; y < this.height; y++) {
            this.tiles[x + "x" + y] = new Tile({
                "position": {"x": x, "y": y}
            })
            if(x % 2 == 0 && y % 2 == 0
            || x == 0 || x == this.width - 1
            || y == 0 || y == this.height - 1) {
                this.tiles[x + "x" + y].wall = true
            }
        }
    }
}

World.prototype.getTile = function(position) {
    position.dx = position.dx || 0
    position.dy = position.dy || 0
    var x = Math.floor(position.x + position.dx)
    var y = Math.floor(position.y + position.dy)
    return this.tiles[x + "x" + y]
}

World.prototype.getTiles = function(position) {
    var tiles = []
    var dx = position.dx || 0
    var dy = position.dy || 0
    var x1 = Math.floor(Math.min(position.x1, position.x2) + dx)
    var x2 = Math.ceil(Math.max(position.x1, position.x2) + dx)
    var y1 = Math.floor(Math.min(position.y1, position.y2) + dy)
    var y2 = Math.ceil(Math.max(position.y1, position.y2) + dy)
    for(var x = x1; x < x2; x++) {
        for(var y = y1; y < y2; y++) {
            tiles.push(this.getTile({
                "x": x, "y": y
            }))
        }
    }
    return tiles
}

var Assets = {
    "images": {
        "red monkey": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIGdlbmVyYXRlZCBhdCBkcnVidWJ1LmNvbSAgLS0+DQoNCjxzdmcNCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyINCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiDQogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiDQogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIg0KICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiDQogICB2ZXJzaW9uPSIxLjEiDQogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ig0KICAgeD0iMHB4Ig0KICAgeT0iMHB4Ig0KICAgd2lkdGg9IjM4Ig0KICAgaGVpZ2h0PSIzNiINCiAgIHZpZXdCb3g9IjAgMCAzOCAzNiINCiAgIGlkPSJzdmczMDc1Ig0KICAgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC40IHI5OTM5Ig0KICAgc29kaXBvZGk6ZG9jbmFtZT0icmVkLW1vbmtleS5zdmciPg0KICA8bWV0YWRhdGENCiAgICAgaWQ9Im1ldGFkYXRhMzE2MyI+DQogICAgPHJkZjpSREY+DQogICAgICA8Y2M6V29yaw0KICAgICAgICAgcmRmOmFib3V0PSIiPg0KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4NCiAgICAgICAgPGRjOnR5cGUNCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4NCiAgICAgIDwvY2M6V29yaz4NCiAgICA8L3JkZjpSREY+DQogIDwvbWV0YWRhdGE+DQogIDxkZWZzDQogICAgIGlkPSJkZWZzMzE2MSIgLz4NCiAgPHNvZGlwb2RpOm5hbWVkdmlldw0KICAgICBwYWdlY29sb3I9IiNmZmZmZmYiDQogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2Ig0KICAgICBib3JkZXJvcGFjaXR5PSIxIg0KICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIg0KICAgICBncmlkdG9sZXJhbmNlPSIxMCINCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIg0KICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCINCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiINCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxNjAwIg0KICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI4MzgiDQogICAgIGlkPSJuYW1lZHZpZXczMTU5Ig0KICAgICBzaG93Z3JpZD0iZmFsc2UiDQogICAgIGZpdC1tYXJnaW4tdG9wPSIwIg0KICAgICBmaXQtbWFyZ2luLWxlZnQ9IjAiDQogICAgIGZpdC1tYXJnaW4tcmlnaHQ9IjAiDQogICAgIGZpdC1tYXJnaW4tYm90dG9tPSIwIg0KICAgICBpbmtzY2FwZTp6b29tPSIxNy4xMzE1NzkiDQogICAgIGlua3NjYXBlOmN4PSIxOSINCiAgICAgaW5rc2NhcGU6Y3k9IjE5Ig0KICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTgiDQogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCINCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSINCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnMzA3NSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAxNSwwIGggNyB2IDEgaCAzIHYgMSBoIDIgdiAxIGggMSB2IDEgaCAxIHYgMSBoIDIgdiA0IGggMSB2IDUgaCAtMSB2IDMgaCAtMSB2IDEgaCAtMSB2IDEgaCAtMSB2IDEgaCAtMSB2IDEgaCAtMiB2IC00IGggMSB2IDIgaCAxIHYgLTMgaCAtMSB2IC0xIGggLTEgdiAtMSBoIC0yIHYgLTEgaCAtOCB2IDEgaCAtMiB2IDEgaCAtMSB2IDEgaCAtMSB2IDMgaCAxIHYgLTIgaCAxIHYgMSBoIDEgdiAzIGggMSB2IC00IGggMSB2IDUgaCA2IHYgMSBoIDEgdiAxIGggMSB2IDcgaCAtMSB2IDMgaCAtMSB2IDEgaCAtMSB2IDEgaCAtMiB2IC00IGggLTEgdiA0IGggLTIgdiAtMSBoIC0xIHYgLTEgaCAtMSB2IC00IGggLTEgdiAtNiBoIDEgdiAtMSBoIDEgViAyMiBIIDEzIFYgMjEgSCAxMSBWIDIwIEggMTAgViAxOSBIIDkgViAxOCBIIDggViAxNyBIIDcgViAxNSBIIDYgViA5IEggNyBWIDUgSCA5IFYgNCBoIDEgViAzIGggMSBWIDIgaCAyIFYgMSBoIDIgeiINCiAgICAgaWQ9InBhdGgzMDc5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDE0LDIgaCAxIHYgMSBoIC0xIHoiDQogICAgIGlkPSJwYXRoMzA4MSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAxNywyIGggMiB2IDEgaCAxIFYgNSBIIDE5IFYgNiBIIDE3IFYgNSBIIDE2IFYgMyBoIDEgeiINCiAgICAgaWQ9InBhdGgzMDgzIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJNIDMsNCBIIDcgViA1IEggMyB6Ig0KICAgICBpZD0icGF0aDMwODUiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZDFjMjQiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMTIsNCBoIDIgdiAyIGggLTIgeiINCiAgICAgaWQ9InBhdGgzMDg3Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDMxLDQgaCA0IHYgMSBoIC00IHoiDQogICAgIGlkPSJwYXRoMzA4OSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VkMWMyNCIgLz4NCiAgPHBhdGgNCiAgICAgZD0iTSAyLDUgSCAzIFYgNiBIIDIgeiINCiAgICAgaWQ9InBhdGgzMDkxIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJNIDMsNSBIIDcgViA5IEggNiB2IDYgaCAxIHYgMiBIIDQgViAxNiBIIDIgViAxNCBIIDEgViA4IEggMiBWIDYgaCAxIHoiDQogICAgIGlkPSJwYXRoMzA5MyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzMSw1IGggNCB2IDEgaCAxIHYgMiBoIDEgdiA2IGggLTEgdiAyIGggLTIgdiAxIGggLTMgdiAtMyBoIDEgViA5IGggLTEgeiINCiAgICAgaWQ9InBhdGgzMDk1Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDM1LDUgaCAxIHYgMSBoIC0xIHoiDQogICAgIGlkPSJwYXRoMzA5NyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VkMWMyNCIgLz4NCiAgPHBhdGgNCiAgICAgZD0iTSAxLDYgSCAyIFYgOCBIIDEgeiINCiAgICAgaWQ9InBhdGgzMDk5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJNIDgsNiBIIDkgViA3IEggOCB6Ig0KICAgICBpZD0icGF0aDMxMDEiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZWVlZWUiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMzYsNiBoIDEgdiAyIGggLTEgeiINCiAgICAgaWQ9InBhdGgzMTAzIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDAsOCBoIDEgdiA2IEggMCB6Ig0KICAgICBpZD0icGF0aDMxMDUiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZDFjMjQiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gOSw4IGggMiB2IDEgaCAxIHYgMyBoIC0xIHYgMSBIIDkgViAxMiBIIDggViA5IGggMSB6Ig0KICAgICBpZD0icGF0aDMxMDciDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZWVlZWUiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMzcsOCBoIDEgdiA2IGggLTEgeiINCiAgICAgaWQ9InBhdGgzMTA5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDE1LDEzIGggOCB2IDEgaCAtMiB2IDEgaCAyIHYgLTEgaCAyIHYgMSBoIDEgdiAxIGggMSB2IDMgaCAtMSB2IC0yIGggLTEgdiAtMSBoIC0yIHYgMSBoIC0xIHYgNSBoIC02IHYgLTUgaCAtMSB2IC0xIGggLTIgdiAxIGggLTEgdiAyIGggLTEgdiAtMyBoIDEgdiAtMSBoIDEgdiAtMSBoIDIgdiAxIGggMiB2IC0xIGggLTIgeiINCiAgICAgaWQ9InBhdGgzMTExIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDEsMTQgaCAxIHYgMiBIIDEgeiINCiAgICAgaWQ9InBhdGgzMTE1Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDE1LDE0IGggMiB2IDEgaCAtMiB6Ig0KICAgICBpZD0icGF0aDMxMTciDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZDFjMjQiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMjEsMTQgaCAyIHYgMSBoIC0yIHoiDQogICAgIGlkPSJwYXRoMzExOSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VkMWMyNCIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzNiwxNCBoIDEgdiAyIGggLTEgeiINCiAgICAgaWQ9InBhdGgzMTIxIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDIsMTYgaCAyIHYgMSBIIDIgeiINCiAgICAgaWQ9InBhdGgzMTI1Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDEzLDE2IGggMiB2IDEgaCAtMiB6Ig0KICAgICBpZD0icGF0aDMxMjciDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZDFjMjQiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMjMsMTYgaCAyIHYgMSBoIC0yIHoiDQogICAgIGlkPSJwYXRoMzEyOSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VkMWMyNCIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzNCwxNiBoIDIgdiAxIGggLTIgeiINCiAgICAgaWQ9InBhdGgzMTMxIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDQsMTcgaCAzIHYgMSBIIDQgeiINCiAgICAgaWQ9InBhdGgzMTMzIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDEzLDE3IGggMiB2IDQgaCAtMSB2IC0zIGggLTEgeiINCiAgICAgaWQ9InBhdGgzMTM1Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDIyLDE3IGggMSB2IDEgaCAxIHYgMyBoIDEgdiAxIGggLTMgeiINCiAgICAgaWQ9InBhdGgzMTM3Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDIzLDE3IGggMiB2IDQgaCAtMSB2IC0zIGggLTEgeiINCiAgICAgaWQ9InBhdGgzMTM5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDMxLDE3IGggMyB2IDEgaCAtMyB6Ig0KICAgICBpZD0icGF0aDMxNDEiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZDFjMjQiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMTgsMjAgaCAxIHYgMSBoIC0xIHoiDQogICAgIGlkPSJwYXRoMzE0MyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VkMWMyNCIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAxNiwyMyBoIDUgdiAxIGggLTEgdiAyIGggLTMgdiAtMiBoIC0xIHoiDQogICAgIGlkPSJwYXRoMzE0NSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAyOCwyNiBoIDMgdiAxIGggLTMgeiINCiAgICAgaWQ9InBhdGgzMTQ3Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDI3LDI3IGggMSB2IDEgaCAxIHYgMSBoIC0yIHoiDQogICAgIGlkPSJwYXRoMzE0OSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VkMWMyNCIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzMSwyNyBoIDEgdiAzIGggLTEgeiINCiAgICAgaWQ9InBhdGgzMTUxIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDMwLDMwIGggMSB2IDEgaCAtMSB6Ig0KICAgICBpZD0icGF0aDMxNTMiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZDFjMjQiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMjQsMzEgaCA2IHYgMSBoIC02IHoiDQogICAgIGlkPSJwYXRoMzE1NSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VkMWMyNCIgLz4NCjwvc3ZnPg0K",
        "blue monkey": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIGdlbmVyYXRlZCBhdCBkcnVidWJ1LmNvbSAgLS0+DQoNCjxzdmcNCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyINCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiDQogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiDQogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIg0KICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiDQogICB2ZXJzaW9uPSIxLjEiDQogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ig0KICAgeD0iMHB4Ig0KICAgeT0iMHB4Ig0KICAgd2lkdGg9IjM4Ig0KICAgaGVpZ2h0PSIzNiINCiAgIHZpZXdCb3g9IjAgMCAzOCAzNiINCiAgIGlkPSJzdmczNzU3Ig0KICAgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC40IHI5OTM5Ig0KICAgc29kaXBvZGk6ZG9jbmFtZT0iYmx1ZS1tb25rZXkuc3ZnIj4NCiAgPG1ldGFkYXRhDQogICAgIGlkPSJtZXRhZGF0YTM4NTEiPg0KICAgIDxyZGY6UkRGPg0KICAgICAgPGNjOldvcmsNCiAgICAgICAgIHJkZjphYm91dD0iIj4NCiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+DQogICAgICAgIDxkYzp0eXBlDQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+DQogICAgICA8L2NjOldvcms+DQogICAgPC9yZGY6UkRGPg0KICA8L21ldGFkYXRhPg0KICA8ZGVmcw0KICAgICBpZD0iZGVmczM4NDkiIC8+DQogIDxzb2RpcG9kaTpuYW1lZHZpZXcNCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIg0KICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiINCiAgICAgYm9yZGVyb3BhY2l0eT0iMSINCiAgICAgb2JqZWN0dG9sZXJhbmNlPSIxMCINCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAiDQogICAgIGd1aWRldG9sZXJhbmNlPSIxMCINCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiDQogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiDQogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTYwMCINCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iODM4Ig0KICAgICBpZD0ibmFtZWR2aWV3Mzg0NyINCiAgICAgc2hvd2dyaWQ9ImZhbHNlIg0KICAgICBmaXQtbWFyZ2luLXRvcD0iMCINCiAgICAgZml0LW1hcmdpbi1sZWZ0PSIwIg0KICAgICBmaXQtbWFyZ2luLXJpZ2h0PSIwIg0KICAgICBmaXQtbWFyZ2luLWJvdHRvbT0iMCINCiAgICAgaW5rc2NhcGU6em9vbT0iMTcuNTY2MDIxIg0KICAgICBpbmtzY2FwZTpjeD0iMzguMjIwOTEiDQogICAgIGlua3NjYXBlOmN5PSIyMi4wMTM3NjciDQogICAgIGlua3NjYXBlOndpbmRvdy14PSItOCINCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIg0KICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmczNzU3IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDE1LDAgaCA3IHYgMSBoIDMgdiAxIGggMiB2IDEgaCAxIHYgMSBoIDEgdiAxIGggMiB2IDQgaCAxIHYgNSBoIC0xIHYgMyBoIC0xIHYgMSBoIC0xIHYgMSBoIC0xIHYgMSBoIC0xIHYgMSBoIC0yIHYgLTQgaCAxIHYgMiBoIDEgdiAtMyBoIC0xIHYgLTEgaCAtMSB2IC0xIGggLTIgdiAtMSBoIC04IHYgMSBoIC0yIHYgMSBoIC0xIHYgMSBoIC0xIHYgMyBoIDEgdiAtMiBoIDEgdiAxIGggMSB2IDMgaCAxIHYgLTQgaCAxIHYgNSBoIDYgdiAxIGggMSB2IDEgaCAxIHYgNyBoIC0xIHYgMyBoIC0xIHYgMSBoIC0xIHYgMSBoIC0yIHYgLTQgaCAtMSB2IDQgaCAtMiB2IC0xIGggLTEgdiAtMSBoIC0xIHYgLTQgaCAtMSB2IC02IGggMSB2IC0xIGggMSBWIDIyIEggMTMgViAyMSBIIDExIFYgMjAgSCAxMCBWIDE5IEggOSBWIDE4IEggOCBWIDE3IEggNyBWIDE1IEggNiBWIDkgSCA3IFYgNSBIIDkgViA0IGggMSBWIDMgaCAxIFYgMiBoIDIgViAxIGggMiB6Ig0KICAgICBpZD0icGF0aDM3NjEiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMTksMSBoIDIgdiAxIGggMSBWIDYgSCAyMCBWIDUgaCAtMSB6Ig0KICAgICBpZD0icGF0aDM3NjMiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZWVlZWUiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMTIsMyBoIDEgdiAxIGggMSBWIDggSCAxMiBWIDcgSCAxMSBWIDQgaCAxIHoiDQogICAgIGlkPSJwYXRoMzc2NSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0iTSAzLDQgSCA3IFYgNSBIIDMgeiINCiAgICAgaWQ9InBhdGgzNzY3Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDMxLDQgaCA0IHYgMSBoIC00IHoiDQogICAgIGlkPSJwYXRoMzc2OSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6IzNmNDhjYyIgLz4NCiAgPHBhdGgNCiAgICAgZD0iTSAyLDUgSCAzIFYgNiBIIDIgeiINCiAgICAgaWQ9InBhdGgzNzcxIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJNIDMsNSBIIDcgViA5IEggNiB2IDYgaCAxIHYgMiBIIDQgViAxNiBIIDIgViAxNCBIIDEgViA4IEggMiBWIDYgaCAxIHoiDQogICAgIGlkPSJwYXRoMzc3MyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAxNSw1IGggMyBWIDYgSCAxNyBWIDggSCAxNiBWIDYgaCAtMSB6Ig0KICAgICBpZD0icGF0aDM3NzUiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZWVlZWUiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMzEsNSBoIDQgdiAxIGggMSB2IDIgaCAxIHYgNiBoIC0xIHYgMiBoIC0yIHYgMSBoIC0zIHYgLTMgaCAxIFYgOSBoIC0xIHoiDQogICAgIGlkPSJwYXRoMzc3NyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzNSw1IGggMSB2IDEgaCAtMSB6Ig0KICAgICBpZD0icGF0aDM3NzkiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Ik0gMSw2IEggMiBWIDggSCAxIHoiDQogICAgIGlkPSJwYXRoMzc4MSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6IzNmNDhjYyIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAyNCw2IGggMiB2IDEgaCAxIHYgMyBoIC0xIHYgMSBIIDI0IFYgMTAgSCAyMyBWIDcgaCAxIHoiDQogICAgIGlkPSJwYXRoMzc4MyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzNiw2IGggMSB2IDIgaCAtMSB6Ig0KICAgICBpZD0icGF0aDM3ODUiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMTksNyBoIDEgdiAxIGggLTEgeiINCiAgICAgaWQ9InBhdGgzNzg3Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDAsOCBoIDEgdiA2IEggMCB6Ig0KICAgICBpZD0icGF0aDM3ODkiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMTQsOCBoIDIgdiAxIGggLTIgeiINCiAgICAgaWQ9InBhdGgzNzkxIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDE3LDggaCAyIHYgMSBoIC0yIHoiDQogICAgIGlkPSJwYXRoMzc5MyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzNyw4IGggMSB2IDYgaCAtMSB6Ig0KICAgICBpZD0icGF0aDM3OTUiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gOCw5IGggMiB2IDEgaCAxIHYgMyBoIC0xIHYgMSBIIDggViAxMyBIIDcgdiAtMyBoIDEgeiINCiAgICAgaWQ9InBhdGgzNzk3Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDE1LDEzIGggOCB2IDEgaCAtMiB2IDEgaCAyIHYgLTEgaCAyIHYgMSBoIDEgdiAxIGggMSB2IDMgaCAtMSB2IC0yIGggLTEgdiAtMSBoIC0yIHYgMSBoIC0xIHYgNSBoIC02IHYgLTUgaCAtMSB2IC0xIGggLTIgdiAxIGggLTEgdiAyIGggLTEgdiAtMyBoIDEgdiAtMSBoIDEgdiAtMSBoIDIgdiAxIGggMiB2IC0xIGggLTIgeiINCiAgICAgaWQ9InBhdGgzNzk5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDEsMTQgaCAxIHYgMiBIIDEgeiINCiAgICAgaWQ9InBhdGgzODAzIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDE1LDE0IGggMiB2IDEgaCAtMiB6Ig0KICAgICBpZD0icGF0aDM4MDUiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMjEsMTQgaCAyIHYgMSBoIC0yIHoiDQogICAgIGlkPSJwYXRoMzgwNyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6IzNmNDhjYyIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzNiwxNCBoIDEgdiAyIGggLTEgeiINCiAgICAgaWQ9InBhdGgzODA5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDIsMTYgaCAyIHYgMSBIIDIgeiINCiAgICAgaWQ9InBhdGgzODEzIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDEzLDE2IGggMiB2IDEgaCAtMiB6Ig0KICAgICBpZD0icGF0aDM4MTUiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMjMsMTYgaCAyIHYgMSBoIC0yIHoiDQogICAgIGlkPSJwYXRoMzgxNyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6IzNmNDhjYyIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzNCwxNiBoIDIgdiAxIGggLTIgeiINCiAgICAgaWQ9InBhdGgzODE5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDQsMTcgaCAzIHYgMSBIIDQgeiINCiAgICAgaWQ9InBhdGgzODIxIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDEzLDE3IGggMiB2IDQgaCAtMSB2IC0zIGggLTEgeiINCiAgICAgaWQ9InBhdGgzODIzIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDIyLDE3IGggMSB2IDEgaCAxIHYgMyBoIDEgdiAxIGggLTMgeiINCiAgICAgaWQ9InBhdGgzODI1Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDIzLDE3IGggMiB2IDQgaCAtMSB2IC0zIGggLTEgeiINCiAgICAgaWQ9InBhdGgzODI3Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDMxLDE3IGggMyB2IDEgaCAtMyB6Ig0KICAgICBpZD0icGF0aDM4MjkiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMTgsMjAgaCAxIHYgMSBoIC0xIHoiDQogICAgIGlkPSJwYXRoMzgzMSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6IzNmNDhjYyIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAxNiwyMyBoIDUgdiAxIGggLTEgdiAyIGggLTMgdiAtMiBoIC0xIHoiDQogICAgIGlkPSJwYXRoMzgzMyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAyOCwyNiBoIDMgdiAxIGggLTMgeiINCiAgICAgaWQ9InBhdGgzODM1Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDI3LDI3IGggMSB2IDEgaCAxIHYgMSBoIC0yIHoiDQogICAgIGlkPSJwYXRoMzgzNyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6IzNmNDhjYyIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzMSwyNyBoIDEgdiAzIGggLTEgeiINCiAgICAgaWQ9InBhdGgzODM5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDMwLDMwIGggMSB2IDEgaCAtMSB6Ig0KICAgICBpZD0icGF0aDM4NDEiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMjQsMzEgaCA2IHYgMSBoIC02IHoiDQogICAgIGlkPSJwYXRoMzg0MyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6IzNmNDhjYyIgLz4NCjwvc3ZnPg0K",
        "green monkey": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAB1ElEQVRYR9WX0U0EMQxE91qhBn7pAIkOKI4OkOiAX2qgFZBPMpobxrHjrFDYr7tsYr/Yzjh7OTZ9LptyHUtgd6+PX9HGPp/elmy3Fo+AFGgHcgpsFoghZwDLYKtQDlmFuwFj526kA/Xx8HLcvz/fBM3HIrsI/QNmzm0hPmbYJjOYcorr/D3Oi8aUPxu7gikoG1dgyoGC8jHfLEYPbXAdus8UzBaqnatx30xVGzlDGIxrmtQEdqJ27nAOwjWVAY78hmCzTjKI6H0UtRQsK/QZoOikqjpLwWYcc93xoVApb0ds5OwM6DYYLlSCOYKr1GkIFumY0p1Im5Qw44mNbA3lIhNYjkh0xLO0quilYA4X6RIrtTvJIHke/rffqky8X/66XWBf5D6pAEciiaLMAs22+dZRuvY4bNSUVRpVdHyscvUpgWGq8QBwOhCQwfxdBcrmlsEYLkurAqtCTYP5rrEOKxeAGSD3MRUxrqXtvpIieeFe2InUUsTUVVs1aBvrwrVS+W/ARu2II8YCHq09JWJVMINCUP6Pdv4cDOtuGzAlN9HhaEVMtagonZHjUbTayl8FU1/x1Z55WsQURFfDTo3YNmCczuziN5IU9a6dSr5pINhKCt3uN+ATwuqrOq0PAAAAAElFTkSuQmCC",
        "purple monkey": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAB0ElEQVRYR+WX/U3DQAzFkxWyFTACdDpgBGCrrFBkJEfuq58/LkWK2vzV3F18v3v22e48HfSZD8o17QJ7f/o4s4Odft522R76WIFePp+nr9fvKzYcH4FsgQkQbirv+FhYnZexDmAZzKokIJ5SCGihdK4KdwGGMaNG1nU9eyowQKsiHkDmlmX525ftJ3MbmLrJnlqMsk08F0YulTm0hTasuzfyKFY8AwqRxZi3TlVk34qnSmB4Wt0si7MMOgTzXMg2rrgvSthevHnrZd3MwCI1RgCZPabaEFgUX3h5spL3L2DZppX5xwLLYi27tdFtp+miEvwsH+F4N/Bbeawa8CyuWBfiVYsNzNatrM7Z+lh1pVfMvRIlY1qfr7oLW1hlkX3XlsduxOBsndXfVjW0jV1Hqe3xGkOEZAXcrlOwSutTAvNalC6YglegLtqeSjLsuNXezI5SylFWzIIjICvEXZWsnSEwNXC4f0ksvWC7VI0nT/EhxVCpKPeNwt03WHSjUTFM4OzbmyhWBRMoC4rvu29ldBsREkFsPTwMGELfHMwrUcyd7FZGUO2SxLJ/BMXcnqWRoeD3FMM2xsZSpQ7jmvsDQ9Wyxq+r2rBiWMgtWBY/Fchf3SOlkDdDCJ4AAAAASUVORK5CYIIA",
    }
}

var Inputs = {
    0: {
        "move north": "W",
        "move south": "S",
        "move west": "A",
        "move east": "D",
        "drop bomb": "<space>"
    },
    1: {
        "move north": "<up>",
        "move south": "<down>",
        "move west": "<left>",
        "move east": "<right>",
        "drop bomb": "<shift>"
    }
}

var Monkey = function(protomonkey) {
    for(var key in protomonkey) {
        this[key] = protomonkey[key]
    }
    
    this.velocity = {
        "minimum": 0.001,
        "maximum": 0.075,
        "x": 0,
        "y": 0,
    }
    this.anchor = {
        "x": 0.5,
        "y": 0.75
    }
    this.girth = 4 / 38
    this.friction = 0.000005
    
    this.status = "alive"
    
    this.bombs = [
        "regular",
        "regular"
    ]
}

Monkey.prototype.getStyle = function() {
    return {
        "width": 1 + "em",
        "height": 1 + "em",
        "position": "absolute",
        "top": this.position.y - this.anchor.y + "em",
        "left": this.position.x - this.anchor.x + "em",
        "backgroundSize": "99% 99%",
        "backgroundPosition": "50% 50%",
        "backgroundRepeat": "no-repeat",
        "backgroundImage": "url(" + this.image + ")",
        "backgroundColor": this.isDead ? "#111" : null,
    }
}

Monkey.prototype.update = function(tick) {
    // keyboard input
    if(Game.input.isDown(this.input["move north"])) {
        this.velocity.y -= this.acceleration * tick
        this.velocity.y = -this.velocity.maximum
    } if(Game.input.isDown(this.input["move south"])) {
        this.velocity.y += this.acceleration * tick
        this.velocity.y = +this.velocity.maximum
    } if(Game.input.isDown(this.input["move west"])) {
        this.velocity.x -= this.acceleration * tick
        this.velocity.x = -this.velocity.maximum
    } if(Game.input.isDown(this.input["move east"])) {
        this.velocity.x += this.acceleration * tick
        this.velocity.x = +this.velocity.maximum
    }
    
    // maximum velocity
    if(this.velocity.y < -this.velocity.maximum) {
        this.velocity.y = -this.velocity.maximum
    } if(this.velocity.y > +this.velocity.maximum) {
        this.velocity.y = +this.velocity.maximum
    } if(this.velocity.x < -this.velocity.maximum) {
        this.velocity.x = -this.velocity.maximum
    } if(this.velocity.x > +this.velocity.maximum) {
        this.velocity.x = +this.velocity.maximum
    }
    
    // collision with world
    var positions = this.getNewPositions({
        "y": this.velocity.y
    })
    for(var coords in positions) {
        var position = positions[coords]
        var bomb = Game.data.bombs[coords]
        var tile = Game.data.world.tiles[coords]
        if(!!tile && !!tile.wall || !!bomb) {
            if(this.velocity.y > 0) {
                this.position.y = tile.position.y
                this.position.y -= this.girth + 0.01
                this.velocity.y = 0
            } else if(this.velocity.y < 0) {
                this.position.y = tile.position.y + 1
                this.position.y += this.girth + 0.01
                this.velocity.y = 0
            }
        }
    }
    var positions = this.getNewPositions({
        "x": this.velocity.x
    })
    for(var coords in positions) {
        var position = positions[coords]
        var bomb = Game.data.bombs[coords]
        var tile = Game.data.world.tiles[coords]
        if(!!tile && !!tile.wall || !!bomb) {
            if(this.velocity.x > 0) {
                this.position.x = tile.position.x
                this.position.x -= this.girth + 0.01
                this.velocity.x = 0
            } else if(this.velocity.x < 0) {
                this.position.x = tile.position.x + 1
                this.position.x += this.girth + 0.01
                this.velocity.x = 0
            }
        }
    }
    
    // translation
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    
    // deceleration
    if(this.velocity.y < 0) {
        this.velocity.y *= Math.pow(this.friction, tick)
        if(this.velocity.y > -this.velocity.minimum) {
            this.velocity.y = 0
        }
    } else if(this.velocity.y > 0) {
        this.velocity.y *= Math.pow(this.friction, tick)
        if(this.velocity.y < +this.velocity.minimum) {
            this.velocity.y = 0
        }
    } if(this.velocity.x < 0) {
        this.velocity.x *= Math.pow(this.friction, tick)
        if(this.velocity.x > -this.velocity.minimum) {
            this.velocity.x = 0
        }
    } else if(this.velocity.x > 0) {
        this.velocity.x *= Math.pow(this.friction, tick)
        if(this.velocity.x < +this.velocity.minimum) {
            this.velocity.x = 0
        }
    }
    
    if(Game.input.isJustDown(this.input["drop bomb"])) {
        if(this.bombs.length > 0) {
            var x = Math.floor(this.position.x)
            var y = Math.floor(this.position.y)
            if(Game.data.bombs[x + "x" + y] == null) {
                Game.data.bombs[x + "x" + y] = new Bomb({
                    position: {"x": x, "y": y},
                    type: this.bombs.pop(),
                    monkey: this,
                })
            }
        }
    }
}

Monkey.prototype.getPositions = function(delta) {
    delta = delta || {}
    delta.x = delta.x || 0
    delta.y = delta.y || 0
    
    var x1 = Math.floor(this.position.x - this.girth + delta.x)
    var y1 = Math.floor(this.position.y - this.girth + delta.y)
    var x2 = Math.ceil(this.position.x + this.girth + delta.x)
    var y2 = Math.ceil(this.position.y + this.girth + delta.y)
    
    var positions = {}
    for(var x = x1; x < x2; x++) {
        for(var y = y1; y < y2; y++) {
            positions[x + "x" + y] = {
                "x": x, "y": y
            }
        }
    }
    return positions
}

Monkey.prototype.hasPosition = function(coords) {
    var positions = this.getPositions()
    return !!positions[coords]
}

Monkey.prototype.getNewPositions = function(delta) {
    var newpositions = this.getPositions(delta)
    var positions = this.getPositions()
    for(var key in newpositions) {
        if(!!positions[key]) {
            delete newpositions[key]
        }
    }
    return newpositions
}

Monkey.prototype.explode = function() {
    this.isDead = true
}

var Bomb = function(protobomb) {
    this.position = protobomb.position || {}
    this.position.x = protobomb.position.x + 0.5 || 1.5
    this.position.y = protobomb.position.y + 0.5 || 1.5
    
    this.type = protobomb.type || "regular",
    this.monkey = protobomb.monkey || null
    
    this.width = 0.8
    this.height = 0.8
    
    this.fuse = 3
    
    this.intensity = 1
}

Bomb.prototype.getStyle = function() {
    return {
        "position": "absolute",
        "borderRadius": "999%",
        "backgroundColor": "#111",
        "width": this.width + "em",
        "height": this.height + "em",
        "left": this.position.x - (this.width / 2) + "em",
        "top": this.position.y - (this.height / 2) + "em",
    }
}

Bomb.prototype.update = function(tick) {
    this.fuse -= tick
    if(this.fuse <= 0) {
        new Explosion({
            "position": {
                "x": Math.floor(this.position.x),
                "y": Math.floor(this.position.y)
            }
        })
    }
}

Bomb.prototype.explode = function() {
    var x = Math.floor(this.position.x)
    var y = Math.floor(this.position.y)
    delete Game.data.bombs[x + "x" + y]
    
    if(!!this.monkey) {
        this.monkey.bombs.push(this.type)
    }
}

var Explosion = function(protoexplosion) {
    protoexplosion.position = protoexplosion.position || {}
    protoexplosion.direction = protoexplosion.direction || {}
    
    this.position = {
        "x": protoexplosion.position.x || 0,
        "y": protoexplosion.position.y || 0
    }
    this.direction = {
        "-x": protoexplosion.direction["-x"] || 0,
        "+x": protoexplosion.direction["+x"] || 0,
        "-y": protoexplosion.direction["-y"] || 0,
        "+y": protoexplosion.direction["+y"] || 0
    }
    
    var x = Math.floor(this.position.x)
    var y = Math.floor(this.position.y)
    var xy = x + "x" + y
    
    if(Game.data.world.tiles[xy]
    && Game.data.world.tiles[xy].wall) {
        return
    }
    
    Game.data.explosions[xy] = this
    
    if(!!Game.data.bombs[xy]) {
        var bomb = Game.data.bombs[xy]
        this.direction["-x"] = Math.max(bomb.intensity, this.direction["-x"])
        this.direction["+x"] = Math.max(bomb.intensity, this.direction["+x"])
        this.direction["-y"] = Math.max(bomb.intensity, this.direction["-y"])
        this.direction["+y"] = Math.max(bomb.intensity, this.direction["+y"])
        bomb.explode()
    }
    
    for(var key in Game.data.monkeys) {
        var monkey = Game.data.monkeys[key]
        if(monkey.hasPosition(x + "x" + y)) {
            monkey.explode()
        }
    }
    
    if(!!this.direction["-x"]) {
        var explosion = new Explosion({
            "position": {"x": this.position.x - 1, "y": this.position.y},
            "direction": {"-x": this.direction["-x"] - 1}
        })
    } if(!!this.direction["+x"]) {
        var explosion = new Explosion({
            "position": {"x": this.position.x + 1, "y": this.position.y},
            "direction": {"+x": this.direction["+x"] - 1}
        })
    } if(!!this.direction["-y"]) {
        var explosion = new Explosion({
            "position": {"x": this.position.x, "y": this.position.y - 1},
            "direction": {"-y": this.direction["-y"] - 1}
        })
    } if(!!this.direction["+y"]) {
        var explosion = new Explosion({
            "position": {"x": this.position.x, "y": this.position.y + 1},
            "direction": {"+y": this.direction["+y"] - 1}
        })
    }
    
    this.burntime = 0.5
}

Explosion.prototype.getStyle = function() {
    return {
        width: "1em",
        height: "1em",
        position: "absolute",
        top: this.position.y + "em",
        left: this.position.x + "em",
        backgroundColor: "#C00",
    }
}

Explosion.prototype.update = function(tick) {
    this.burntime -= tick
    if(this.burntime <= 0) {
        var x = Math.floor(this.position.x)
        var y = Math.floor(this.position.y)
        delete Game.data.explosions[x + "x" + y]
    }
}

var GameStore = Phlux.createStore({
    initiateStore: function() {
        window.Game.data = this.data = {
            monkeys: {
                0: new Monkey({
                    "position": {
                        "x": 1.5,
                        "y": 1.5
                    },
                    "acceleration": 0.75,
                    "image": Assets.images["red monkey"],
                    "input": Inputs[0],
                    "store": this
                }),
                /*1: new Monkey({
                    "position": {
                        "x": 11.5,
                        "y": 5.5
                    },
                    "acceleration": 0.75,
                    "image": Assets.images["blue monkey"],
                    "input": Inputs[1],
                    "store": this
                })*/
            },
            world: new World(),
            bombs: {},
            explosions: {},
        }
    },
    update: function(tick) {
        for(var key in this.data.monkeys) {
            var monkey = this.data.monkeys[key]
            monkey.update(tick)
        }
        for(var key in this.data.bombs) {
            var bomb = this.data.bombs[key]
            bomb.update(tick)
        }
        for(var key in this.data.explosions) {
            var explosion = this.data.explosions[key]
            explosion.update(tick)
        }
        this.trigger()
    }
})

module.exports = GameStore
