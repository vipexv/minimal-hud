local interface = require("modules.interface.client")
local utility = require("modules.utils.shared")
local functions = require("config.functions")
local debug = utility.debug

local VehicleStatusThread = {}
VehicleStatusThread.__index = VehicleStatusThread

function VehicleStatusThread.new(playerStatus, seatbeltLogic)
	local self = setmetatable({}, VehicleStatusThread)
	self.playerStatus = playerStatus
	self.seatbelt = seatbeltLogic

	SetHudComponentPosition(6, 999999.0, 999999.0) -- VEHICLE NAME
	SetHudComponentPosition(7, 999999.0, 999999.0) -- AREA NAME
	SetHudComponentPosition(8, 999999.0, 999999.0) -- VEHICLE CLASS
	SetHudComponentPosition(9, 999999.0, 999999.0) -- STREET  NAME

	return self
end

function VehicleStatusThread:start()
	CreateThread(function()
		local ped = PlayerPedId()
		local playerStatusThread = self.playerStatus
		local convertRpmToPercentage = utility.convertRpmToPercentage
		local convertEngineHealthToPercentage = utility.convertEngineHealthToPercentage

		playerStatusThread:setIsVehicleThreadRunning(true)

		while IsPedInAnyVehicle(ped, false) do
			local vehicle = GetVehiclePedIsIn(ped, false)
			local engineHealth = convertEngineHealthToPercentage(GetVehicleEngineHealth(vehicle))
			local speed = math.floor(GetEntitySpeed(vehicle) * 2.236936)
			local rpm = convertRpmToPercentage(GetVehicleCurrentRpm(vehicle))
			local fuelValue = math.max(0, math.min(functions.getVehicleFuel(vehicle), 100))
			local engineState = GetIsVehicleEngineRunning(vehicle)
			local fuel = math.floor(fuelValue)
			local gears = GetVehicleHighGear(vehicle)

			interface.message("setVehicleState", {
				speed = speed,
				rpm = rpm,
				engineHealth = engineHealth,
				engineState = engineState,
				gears = gears,
				fuel = fuel,
			})

			Wait(120)
		end

		if self.seatbelt then
			debug("(vehicleStatusThread) seatbelt found, toggling to false")
			self.seatbelt:toggle(false)
		end

		playerStatusThread:setIsVehicleThreadRunning(false)
		debug("(vehicleStatusThread) Vehicle status thread ended.")
	end)
end

return VehicleStatusThread
