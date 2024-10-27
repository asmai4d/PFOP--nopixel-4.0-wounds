fx_version "cerulean"

games { "gta5" }

description "Cool Wounds"

version "0.1.0"

-- Load NUI project
--ui_page 'http://localhost:3000'
ui_page 'nui/dist/index.html'

files {
    "nui/dist/**/*",
}

files { 'nui/dist/index.html', 'nui/dist/**/*' }

server_scripts { "build/sv_*.js" }
client_scripts { "build/cl_*.js" }