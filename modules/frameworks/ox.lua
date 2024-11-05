local debug = require("modules.utils.shared").debug

local oxFramework = {}
oxFramework.__index = oxFramework

function oxFramework.new()
	debug("(oxFramework:new) Created new instance.")

	local self = setmetatable({}, oxFramework)
	self.values = {}

	AddEventHandler("ox:statusTick", function(data)
		self.values.hunger = 100 - data.hunger
		self.values.thirst = 100 - data.thirst
		self.values.stress = data.stress
	end)

	return self
end

function oxFramework:getPlayerHunger()
	return self.values.hunger
end

function oxFramework:getPlayerThirst()
	return self.values.thirst
end

function oxFramework:getPlayerStress()
	return self.values.stress
end

return oxFramework
