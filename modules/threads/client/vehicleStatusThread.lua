local debug = require("modules.utils.shared").debug
local interface = require("modules.interface.client")
local utility = require("modules.utils.shared")

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

    self.playerStatus:setIsVehicleThreadRunning(true)

    while IsPedInAnyVehicle(ped, false) do
      local vehicle = GetVehiclePedIsIn(ped, false)
      local engineHealth = tonumber(GetVehicleEngineHealth(vehicle) / 100 * 100)
      local speed = math.floor(GetEntitySpeed(vehicle) * 2.236936)
      local rpm = utility.convertRpmToPercentage(GetVehicleCurrentRpm(vehicle))
      local fuelValue = Entity(vehicle).state.fuel or GetVehicleFuelLevel(vehicle)
      local fuel = math.floor(fuelValue * 10 + 0.5) / 10

      interface.message("setVehicleState", {
        speed = speed,
        rpm = rpm,
        engine = engineHealth,
        fuel = fuel,
      })

      debug("(vehicleStatusThread) Vehicle status: ", rpm)
      Wait(120)
    end

    self.playerStatus:setIsVehicleThreadRunning(false)
    debug("(vehicleStatusThread) Vehicle status thread ended.")
  end)
end

return VehicleStatusThread
