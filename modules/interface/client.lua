local interface = {}

---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
interface.message = function(action, data)
    SendNUIMessage({
        action = action,
        data = data
    })
end

---@param shouldShow boolean
interface.toggle = function(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    interface.message("setVisible", shouldShow)
end

return interface
