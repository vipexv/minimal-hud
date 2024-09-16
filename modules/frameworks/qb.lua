local debug = require("modules.utils.shared").debug

local qb = exports["qb-core"]:GetCoreObject()

local qbFramework = {}
qbFramework.__index = qbFramework

function qbFramework.new()
	debug("(qbFramework:new) Created new instance.")
	local self = setmetatable({}, qbFramework)
	return self
end

function qbFramework:getPlayerHunger()
	local playerData = qb.Functions.GetPlayerData()

	if not playerData.metadata then
		debug("(qbFramework:getPlayerHunger) PlayerData.metadata is nil, returning 0")
		return "disabled"
	end

	local metadata = playerData.metadata

	debug("(qbFramework:getPlayerHunger) Returning: ", metadata["hunger"])
	return math.floor(metadata["hunger"])
end

function qbFramework:getPlayerThirst()
	local playerData = qb.Functions.GetPlayerData()

	if not playerData.metadata then
		debug("(qbFramework:getPlayerThirst) PlayerData.metadata is nil, returning 0")
		return "disabled"
	end

	local metadata = playerData.metadata

	debug("(qbFramework:getPlayerThirst) Returning: ", metadata["thirst"])
	return math.floor(metadata["thirst"])
end

function qbFramework:getPlayerStress()
	local playerData = qb.Functions.GetPlayerData()

	if not playerData.metadata then
		debug("(qbFramework:getPlayerStress) PlayerData.metadata is nil, returning 0")
		return "disabled"
	end

	local metadata = playerData.metadata

	debug("(qbFramework:getPlayerThirst) Returning: ", metadata["stress"])
	return math.floor(metadata["stress"])
end

return qbFramework
