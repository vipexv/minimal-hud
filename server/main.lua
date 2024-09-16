-- Core Logic
local utility = require("modules.utils.server")

CreateThread(function()
	if not utility.isInterfaceCompiled() then
		print(
			"^1Interface not compiled, either compile the interface or download a compiled version here: ^0https://github.com/vipexv/minimal-hud/releases/latest"
		)
	end

	utility.versionCheck("vipexv/minimal-hud")
end)
