-- Core Logic
local config = require("config.shared")
local playerStatusClass = require("modules.threads.client.playerStatus")
local vehicleStatusClass = require("modules.threads.client.vehicleStatusThread")
local seatbeltLogicClass = require("modules.seatbelt.client")
local utility = require("modules.utils.shared")

local seatbeltLogic = seatbeltLogicClass.new()
local playerStatusThread = playerStatusClass.new("main")
local vehicleStatusThread = vehicleStatusClass.new(playerStatusThread, seatbeltLogic)
local framework = utility.isFrameworkValid() and require("modules.frameworks." .. config.framework:lower()).new() or
false

playerStatusThread:start(vehicleStatusThread, seatbeltLogic, framework)
