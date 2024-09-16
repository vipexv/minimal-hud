local interface = require("modules.interface.client")

RegisterCommand("togglehud", function()
	interface.toggle()
end, false)
