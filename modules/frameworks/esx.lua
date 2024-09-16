local debug = require("modules.utils.shared").debug

local esxFramework = {}
esxFramework.__index = esxFramework

function esxFramework.new()
	debug("(esxFramework:new) Created new instance.")

	local self = setmetatable({}, esxFramework)
	self.values = {}

	AddEventHandler("esx_status:onTick", function(data)
		for i = 1, #data do
			if data[i].name == "hunger" then
				self.values.hunger = math.floor(data[i].percent)
			end

			if data[i].name == "thirst" then
				self.values.thirst = math.floor(data[i].percent)
			end

			if data[i].name == "stress" then
				self.values.stress = math.floor(data[i].percent)
			end
		end
	end)

	return self
end

function esxFramework:getPlayerHunger()
	return self.values.hunger
end

function esxFramework:getPlayerThirst()
	return self.values.thirst
end

function esxFramework:getPlayerStress()
	return self.values.stress
end

return esxFramework
