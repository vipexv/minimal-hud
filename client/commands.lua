local interface = require("modules.interface.client")
local debug = require("modules.utils.shared").debug

RegisterCommand(("%s"):format(GetCurrentResourceName()), function()
    interface.toggle(true)

    debug("(command:show-nui) Called and set to true.")
end, false)
