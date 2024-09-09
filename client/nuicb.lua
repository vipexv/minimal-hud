local interface = require("modules.interface.client")
local config = require("config.shared")
local utility = require("modules.utils.shared")
local debug = utility.debug

RegisterNuiCallback("hideFrame", function(_, cb)
    cb(true)
    interface.toggle(false)
    debug("(nuicb:hideFrame) Called and set to false.")
end)

RegisterNuiCallback('uiLoaded', function(_, cb)
    local data = {
        config = config,
        minimap = utility.calculateMinimapSizeAndPosition(),
    }

    cb(data)

    CreateThread(utility.setupMinimap)

    debug("(nuicb:uiLoaded) Updating config and setting up minimap.")
end)
