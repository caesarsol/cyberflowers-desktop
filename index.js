const path = require('path')
const url = require('url')
const electron = require('electron')
const watch = require('electron-reload')

const { app, BrowserWindow } = electron

watch(__dirname)

app.on('ready', () => {
  const displays = electron.screen.getAllDisplays()
  // const displays = [electron.screen.getPrimaryDisplay()]
  const windows = []

  displays.forEach((display, i) => {
    const { width, height } = display.workAreaSize

    windows[i] = new BrowserWindow({
      x: display.bounds.x,
      y: display.bounds.y,
      width,
      height,
      type: 'desktop',
      frame: false,
      show: false,
    })

    windows[i].once('ready-to-show', () => {
      windows[i].show()
    })

    windows[i].on('closed', () => {
      windows[i] = null
    })

    windows[i].loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  })
})
