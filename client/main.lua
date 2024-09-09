-- Core Logic
local playerStatusClass = require("modules.threads.client.playerStatus")
local vehicleStatusClass = require("modules.threads.client.vehicleStatusThread")
local utils = require("modules.utils.shared")

local playerStatusThread = playerStatusClass.new("main")
local vehicleStatusThread = vehicleStatusClass.new(playerStatusThread)

playerStatusThread:start(vehicleStatusThread)

CreateThread(utils.setupMinimap)
