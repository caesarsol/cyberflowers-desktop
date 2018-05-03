const path = require('path')
const url = require('url')
const electron = require('electron')
const { app, BrowserWindow } = electron

app.on('ready', () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize

  let win = new BrowserWindow({
    type: 'desktop',
    frame: false,
    titleBarStyle: 'hidden',
    width,
    height,
    show: false,
  })

  win.once('ready-to-show', () => {
    win.show()
  })

  win.on('closed', () => {
    win = null
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
})
