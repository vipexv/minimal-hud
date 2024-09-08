local utility = {}
local config = require 'config.shared'
local currentResourceName = GetCurrentResourceName()


---@param value number
---@return number
utility.convertRpmToPercentage = function(value)
    return math.ceil(value * 10000 - 2001) / 80
end

---@return {width: number, height: number   , left: number   , top: number}
utility.calculateMinimapSizeAndPosition = function()
    local safezoneSize = GetSafeZoneSize()
    local aspectRatio = GetAspectRatio(false)

    if aspectRatio > 2 then aspectRatio = 16 / 9 end

    local screenWidth, screenHeight = GetActiveScreenResolution()
    local xScale = 1.0 / screenWidth
    local yScale = 1.0 / screenHeight

    local minimap = {
        width = xScale * (screenWidth / (4 * aspectRatio)),
        height = yScale * (screenHeight / 5.674),
        leftX = xScale * (screenWidth * (1.0 / 20.0 * ((math.abs(safezoneSize - 1.0)) * 10))),
        bottomY = 1.0 - yScale * (screenHeight * (1.0 / 20.0 * ((math.abs(safezoneSize - 1.0)) * 10)))
    }

    if aspectRatio > 2 then
        minimap.leftX = minimap.leftX + minimap.width * 0.845
        minimap.width = minimap.width * 0.76
    elseif aspectRatio > 1.8 then
        minimap.leftX = minimap.leftX + minimap.width * 0.2225
        minimap.width = minimap.width * 0.995
    end

    minimap.topY = minimap.bottomY - minimap.height

    return {
        width = minimap.width * screenWidth,
        height = minimap.height * screenHeight,
        left = minimap.leftX * 100,
        top = minimap.topY * 100
    }
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
