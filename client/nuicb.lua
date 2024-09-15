local interface = require("modules.interface.client")
local config = require("config.shared")
local utility = require("modules.utils.shared")
local debug = utility.debug

RegisterNuiCallback("uiLoaded", function(_, cb)
	local data = {
		config = config,
		minimap = utility.calculateMinimapSizeAndPosition(),
	}

	cb(data)

	CreateThread(utility.setupMinimap)

	debug("(nuicb:uiLoaded) Updating config and setting up minimap.")
end)
