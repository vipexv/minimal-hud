local interface = require("modules.interface.client")
local utility = require("modules.utils.shared")
local debug = utility.debug

local VehicleStatusThread = {}
VehicleStatusThread.__index = VehicleStatusThread

function VehicleStatusThread.new(playerStatus)
  local self = setmetatable({}, VehicleStatusThread)
  self.playerStatus = playerStatus
  return self
end

function VehicleStatusThread:start()
  CreateThread(function()
    local ped = PlayerPedId()
    local playerStatusThread = self.playerStatus
    local convertRpmToPercentage = utility.convertRpmToPercentage
    local convertEngineHealthToPercentage = utility.convertEngineHealthToPercentage
    self.playerStatus:setIsVehicleThreadRunning(true)

    while IsPedInAnyVehicle(ped, false) do
      local vehicle = GetVehiclePedIsIn(ped, false)
      local engineHealth = convertEngineHealthToPercentage(GetVehicleEngineHealth(vehicle))
      local speed = math.floor(GetEntitySpeed(vehicle) * 2.236936)
      local rpm = convertRpmToPercentage(GetVehicleCurrentRpm(vehicle))
      local fuelValue = Entity(vehicle).state.fuel or GetVehicleFuelLevel(vehicle)
      local fuel = math.floor(fuelValue * 10 + 0.5) / 10
      local gears = GetVehicleHighGear(vehicle)

      interface.message("setVehicleState", {
        speed = speed,
        rpm = rpm,
        engine = engineHealth,
        gears = gears,
        fuel = fuel,
      })

      Wait(120)
    end

    playerStatusThread:setIsVehicleThreadRunning(false)
    debug("(vehicleStatusThread) Vehicle status thread ended.")
  end)
end

return VehicleStatusThread
