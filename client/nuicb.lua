local interface = require("modules.interface.client")
local debug = require("modules.utils.shared").debug
local config = require("config.shared")

RegisterNuiCallback("hideFrame", function(_, cb)
    cb(true)
    interface.toggle(false)
    debug("(nuicb:hideFrame) Called and set to false.")
end)

-- Called once when the app is loaded in the browser, you can return any necessary data here.
RegisterNuiCallback('uiLoaded', function(_, cb)
    cb(config)
    debug("(nuicb:uiLoaded) Updating config.")
end)
