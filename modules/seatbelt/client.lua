local config = require("config.shared")
local debug = require("modules.utils.shared").debug

local SeatbeltLogic = {}
SeatbeltLogic.__index = SeatbeltLogic

function SeatbeltLogic.new()
	if not config.useBuiltInSeatbeltLogic then
		debug("(SeatbeltLogic.new) Config.useBuiltInSeatbeltLogic is disabled.")
		return
	end

	local self = setmetatable({}, SeatbeltLogic)
	self.seatbeltState = false
	self.ejectVelocity = (1 / 2.236936)
	self.unknownEjectVelocity = (2 / 2.236936)
	self.unknownModifier = 17.0
	self.minDamage = 0.0

	RegisterCommand("toggleSeatbelt", function()
		local ped = PlayerPedId()
		if not IsPedInAnyVehicle(ped, false) or IsPedOnAnyBike(ped) then
			return debug(
				"(SeatbeltLogic:toggle) Seatbelt is not available either due to the fact that the player is not in a vehicle or on a bike."
			)
		end

		self:toggle(not self.seatbeltState)
		debug("(commands:toggleSeatbelt) Toggled seatbelt.")
	end, false)

	SetFlyThroughWindscreenParams(self.ejectVelocity, self.unknownEjectVelocity, self.unknownModifier, self.minDamage)
	SetPedConfigFlag(PlayerPedId(), 32, true)
	RegisterKeyMapping("toggleSeatbelt", "Toggle Seatbelt", "keyboard", "B")

	return self
end

---@param state boolean
function SeatbeltLogic:toggle(state)
	self.seatbeltState = state

	if state then
		SetFlyThroughWindscreenParams(10000.0, 10000.0, 17.0, 500.0)
		self:disableVehicleExitControlThread()
		debug("(SeatbeltLogic:toggle) Seatbelt enabled.")
	else
		SetFlyThroughWindscreenParams(
			self.ejectVelocity,
			self.unknownEjectVelocity,
			self.unknownModifier,
			self.minDamage
		)
		debug("(SeatbeltLogic:toggle) Seatbelt disabled.")
	end
end

function SeatbeltLogic:disableVehicleExitControlThread()
	debug("(SeatbeltLogic:disableVehicleExitControlThread) Thread enabled.")
	Citizen.CreateThread(function()
		while self.seatbeltState do
			DisableControlAction(0, 75, true) -- 75: INPUT_VEH_EXIT
			Wait(0)
		end
		debug("(SeatbeltLogic:disableVehicleExitControlThread) Thread disabled.")
	end)
end

function SeatbeltLogic:isSeatbeltOn()
	debug("(SeatbeltLogic:isSeatbeltOn) Returning: ", self.seatbeltState)

	return self.seatbeltState
end

return SeatbeltLogic
