---@diagnostic disable: undefined-global
fx_version "cerulean"
game "gta5"

author "vipex"
version "1.0.0"

shared_scripts {
    "require.lua",
}

client_scripts {
    "client/main.lua",
    "client/nuicb.lua",
    "client/commands.lua",
}

server_scripts {
    "server/main.lua",
}

-- ui_page 'dist/web/index.html'
ui_page 'http://localhost:5173/'

files {
    'dist/web/index.html',
    'dist/web/assets/*.js',
    'dist/web/assets/*.css',
    'dist/web/**/*.woff2',
    "config/shared.lua",
    "modules/interface/client.lua",
    "modules/utils/shared.lua",
}

lua54 "yes"
use_experimental_fxv2_oal "yes"
