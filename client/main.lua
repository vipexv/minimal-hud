-- Core Logic
local playerStatusClass = require("modules.threads.client.playerStatus")
local vehicleStatusClass = require("modules.threads.client.vehicleStatusThread")
local seatbeltLogicClass = require("modules.seatbelt.client")
local utils = require("modules.utils.shared")

local playerStatusThread = playerStatusClass.new("main")
local vehicleStatusThread = vehicleStatusClass.new(playerStatusThread)
local seatbeltLogic = seatbeltLogicClass.new()

playerStatusThread:start(vehicleStatusThread, seatbeltLogic)

CreateThread(utils.setupMinimap)
