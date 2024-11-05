local utility = {}
local config = require("config.shared")
local currentResourceName = GetCurrentResourceName()

---@param value number
---@return number
utility.convertRpmToPercentage = function(value)
	local percentage = math.ceil(value * 10000 - 2001) / 80
	return math.max(0, math.min(percentage, 100))
end

---@param num number
---@param numDecimalPlaces number?
---@return integer
utility.round = function(num, numDecimalPlaces)
	local mult = 10 ^ (numDecimalPlaces or 0)
	return math.floor(num + 0.5 * mult)
end

utility.convertEngineHealthToPercentage = function(value)
	local percentage = ((value + 4000) / 5000) * 100

	percentage = math.max(0, math.min(percentage, 100))

	return percentage
end

---@return {width: number, height: number, left: number, top: number}
utility.calculateMinimapSizeAndPosition = function()
	local resolutionX, resolutionY = GetActiveScreenResolution()
	local aspectRatio = resolutionX / resolutionY
	local defaultAspectRatio = 1920 / 1080
	local minimapOffset = 0
	local safezoneSize = GetSafeZoneSize()

	if aspectRatio > defaultAspectRatio then
		minimapOffset = ((defaultAspectRatio - aspectRatio) / 3.6) - 0.008
	end

	local minimapLeft = 0.0 + minimapOffset
	local minimapBottom = 1.0 - 0.047
	local minimapWidth = 0.1638
	local minimapHeight = 0.183

	local safezoneOffset = (1.0 - safezoneSize) * 0.5
	minimapLeft = minimapLeft + safezoneOffset
	minimapBottom = minimapBottom - safezoneOffset

	local pixelWidth = minimapWidth * resolutionX
	local pixelHeight = minimapHeight * resolutionY
	local pixelLeft = minimapLeft * resolutionX
	local pixelTop = (minimapBottom - minimapHeight) * resolutionY

	return {
		width = pixelWidth,
		height = pixelHeight,
		left = (pixelLeft / resolutionX) * 100,
		top = (pixelTop / resolutionY) * 100,
	}
end

---@param ... any
utility.debug = function(...)
	if not config.debug then
		return
	end

	local info = debug.getinfo(2, "Sl") -- Get caller info
	local line = info.currentline or "?"
	local source = info.short_src or "?"

	local args = { ... }
	local append = ""

	for _, v in ipairs(args) do
		append = append .. " " .. tostring(v)
	end

	local template = "^3[%s:%d]^0%s"
	local message = template:format(source, line, append)
	print(message)
end

---@param ... any
utility.warn = function(...)
	local info = debug.getinfo(2, "Sl") -- Get caller info
	local line = info.currentline or "?"
	local source = info.short_src or "?"

	local args = { ... }
	local append = ""

	for _, v in ipairs(args) do
		append = append .. " " .. tostring(v)
	end

	local template = "^1[WARNING | %s:%d]^3%s^0"
	local message = template:format(source, line, append)
	print(message)
end

--- Checks whether the specified framework is valid.
---@return boolean
utility.isFrameworkValid = function()
	local framework = config.framework and config.framework:lower() or nil

	if not framework then
		utility.debug("(utility:isFrameworkValid) No framework specified, defaulting to 'none'.")
		return false
	end

	local validFrameworks = {
		esx = true,
		qb = true,
		ox = true,
		custom = true,
	}

	utility.debug("(utility:isFrameworkValid) Checking if framework is valid: ", validFrameworks[framework] ~= nil)
	return validFrameworks[framework] ~= nil
end

-- Prevents the bigmap from staying active after the minimap is closed, since sometimes the bigmap is still active and stuck on the screen
utility.preventBigmapFromStayingActive = function()
	local timeout = 0
	while true do
		utility.debug("(utility:preventBigmapFromStayingActive) Running, timeout: ", timeout)
		SetBigmapActive(false, false)
		if timeout >= 10000 then
			break
		else
			timeout = timeout + 1000
		end
		Wait(1000)
	end
end

utility.setupMinimap = function()
	utility.debug("(utility:setupMinimap) Setting up minimap.")
	local defaultAspectRatio = 1920 / 1080
	local resolutionX, resolutionY = GetActiveScreenResolution()
	local aspectRatio = resolutionX / resolutionY
	local minimapOffset = 0

	if aspectRatio > defaultAspectRatio then
		minimapOffset = ((defaultAspectRatio - aspectRatio) / 3.6) - 0.008
	end

	RequestStreamedTextureDict("squaremap", false)

	while not HasStreamedTextureDictLoaded("squaremap") do
		Wait(100)
	end

	SetMinimapClipType(0)
	AddReplaceTexture("platform:/textures/graphics", "radarmasksm", "squaremap", "radarmasksm")
	AddReplaceTexture("platform:/textures/graphics", "radarmask1g", "squaremap", "radarmasksm")

	SetMinimapComponentPosition("minimap", "L", "B", 0.0 + minimapOffset, -0.047, 0.1638, 0.183)
	SetMinimapComponentPosition("minimap_mask", "L", "B", 0.0 + minimapOffset, 0.0, 0.128, 0.20)
	SetMinimapComponentPosition("minimap_blur", "L", "B", -0.01 + minimapOffset, 0.025, 0.262, 0.300)

	SetBlipAlpha(GetNorthRadarBlip(), 0)
	SetBigmapActive(true, false)
	SetMinimapClipType(0)
	CreateThread(utility.preventBigmapFromStayingActive)
end

---@param coords vector3
---@return boolean
---@return table
utility.get2DCoordFrom3DCoord = function(coords)
	if not coords then
		return false, {}
	end
	local onScreen, x, y = GetScreenCoordFromWorldCoord(coords.x, coords.y, coords.z)
	return onScreen, { left = tostring(x * 100) .. "%", top = tostring(y * 100) .. "%" }
end

return utility
