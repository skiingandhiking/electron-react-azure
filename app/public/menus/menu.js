const { app, Menu } = require('electron')

const template = [{
    label: 'Help',
    submenu: [{
        label: 'Toggle Developer Tools',
        click(item, focusedWindow) {
            let contents = focusedWindow.webContents;
            contents.isDevToolsOpened() ? contents.closeDevTools() : contents.openDevTools();
        }
    }]
}];

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services', submenu: [] },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    });
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);