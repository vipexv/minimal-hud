local utility = {}
local config = require 'config.shared'
local currentResourceName = GetCurrentResourceName()


---@param value number
---@return number
utility.convertRpmToPercentage = function(value)
    return math.ceil(value * 10000 - 2001) / 80
end

---@param ... any
utility.debug = function(...)
    if not config.debug then return end

    local args <const> = { ... }
    local append = ""

    for _, v in ipairs(args) do
        append = append .. " " .. tostring(v)
    end

    local template = "^3[%s]^0%s"
    local message = template:format(currentResourceName, append)
    print(message)
end

---@param coords vector3
---@return boolean
---@return table
utility.get2DCoordFrom3DCoord = function(coords)
    if not coords then return false, {} end
    local onScreen, x, y = GetScreenCoordFromWorldCoord(coords.x, coords.y, coords.z)
    return onScreen, { left = tostring(x * 100) .. "%", top = tostring(y * 100) .. "%" }
end

return utility
