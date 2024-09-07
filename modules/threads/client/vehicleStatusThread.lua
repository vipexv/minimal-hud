local debug = require("modules.utils.shared").debug
local interface = require("modules.interface.client")
local playerStatusClass = require("modules.threads.client.playerStatus")

local playerStatus = playerStatusClass.getInstanceById("main")

local vehicleStatusThread = CreateThread(function()
  local ped = PlayerPedId()

  while IsPedInAnyVehicle(ped, false) do
    local vehicle = GetVehiclePedIsIn(ped, false)
    local engineHealth = tonumber(GetVehicleEngineHealth(cache.vehicle) / 100 * 100)
    local speed = math.floor(GetEntitySpeed(cache.vehicle) * 2.236936)
    local rpm = math.floor(GetVehicleCurrentRpm(vehicle) / 100 * 100)
    local fuelValue = Entity(vehicle).state.fuel or GetVehicleFuelLevel(cache.vehicle)
    local fuel = math.floor(fuelValue * 10 + 0.5) / 10


    interface.message("setVehicleState", {
      speed = speed,
      rpm = rpm,
      engine = engineHealth,
      fuel = fuel,
    })

    debug("(vehicleStatusThread) Vehicle status: ", speed, engineHealth, fuel)

    Wait(120)
  end

  playerStatus:setIsVehicleThreadRunning(false)
  debug("(vehicleStatusThread) Vehicle status thread ended.")
end)

return vehicleStatusThread
