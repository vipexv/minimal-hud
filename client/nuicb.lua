local interface = require("modules.interface.client")
local debug = require("modules.utils.shared").debug
local config = require("config.shared")
local utility = require("modules.utils.shared")

RegisterNuiCallback("hideFrame", function(_, cb)
    cb(true)
    interface.toggle(false)
    debug("(nuicb:hideFrame) Called and set to false.")
end)

-- Called once when the app is loaded in the browser, you can return any necessary data here.
RegisterNuiCallback('uiLoaded', function(_, cb)
    local data = {
        config = config,
        minimap = utility.calculateMinimapSizeAndPosition(),
    }

    cb(data)
    debug("(nuicb:uiLoaded) Updating config.")
end)
