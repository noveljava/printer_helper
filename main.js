'use strict'
const { app, BrowserWindow } = require('electron')

console.log(BrowserWindow)
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            affinity: 'main-window',
            nativeWindowOpen: true
        }
    })

    win.loadFile('index.html')
    // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quite()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
