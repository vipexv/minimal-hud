-- Core Logic
local playerStatusThread = require("modules.threads.client.playerStatus")

CreateThread(playerStatusThread)
