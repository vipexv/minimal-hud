local interface = {}
local debug = require("modules.utils.shared").debug

---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
interface.message = function(action, data)
	SendNUIMessage({
		action = action,
		data = data,
	})
end

---@param shouldShow boolean|string? Whether or not to show the frame. If no value is passed, the frame will toggle.
interface.toggle = function(shouldShow)
	if not shouldShow then
		shouldShow = "toggle"
		debug("(interface:toggle) No value passed, defaulting to nil.")
	end

	interface.message("setVisible", shouldShow)
end

return interface
