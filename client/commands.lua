local interface = require("modules.interface.client")

RegisterCommand("togglehud", function()
    interface.toggleHud()
end, false)
