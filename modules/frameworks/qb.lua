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
  local metadata = qb.Functions.GetPlayerData().metadata

  debug("(qbFramework:getPlayerHunger) Returning: ", metadata['hunger'])
  return math.floor(metadata['hunger'])
end

function qbFramework:getPlayerThirst()
  local metadata = qb.Functions.GetPlayerData().metadata

  debug("(qbFramework:getPlayerThirst) Returning: ", metadata['thirst'])
  return math.floor(metadata['thirst'])
end
