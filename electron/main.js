import {app, BrowserWindow, ipcMain} from 'electron';
import {fileURLToPath} from 'url'
import sqlite3 from "sqlite3";
import {open} from 'sqlite'
import path from 'node:path';
import * as fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Get the path to the user data directory
app.setName('waldhaus-reservations');
const userDataPath = app.getPath('userData');

const dbDirectory = path.join(userDataPath);
if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(dbDirectory, { recursive: true });
}

const db = await open({
    filename: path.join(userDataPath, 'database.sqlite'),
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
});


await db.exec(`
    CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        date DATE NOT NULL,
        count INTEGER NOT NULL,
        contact TEXT,
        notes TEXT,
        deleted BOOLEAN DEFAULT FALSE
    )
`);

ipcMain.handle('get-reservations', async () => {
    return await db.all('SELECT * FROM reservations');
});

ipcMain.handle('save-reservation', (event, reservation) => {
    const { id, name, date, count, contact, notes, deleted } = reservation;

    db.run(
        `
        INSERT INTO reservations (name, date, count, contact, notes)
        VALUES (?, ?, ?, ?, ?)
        `,
        [name, date, count, contact, notes]
    );
})

ipcMain.handle('update-reservation', (event, reservation) => {
    const { id, name, date, count, contact, notes, deleted } = reservation;

    db.run(
        `
        UPDATE reservations
        SET name = ?,
            date = ?,
            count = ?,
            contact = ?,
            notes = ?,
            deleted = ?
        WHERE id = ?
        `,
        [name, date, count, contact, notes, deleted, id]
    );
})

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    if (app.isPackaged) {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
    } else {
        // Making sure that the Server has started before
        // the URL is loaded
        setTimeout(() => {
            mainWindow.loadURL('http://localhost:5173');
        }, 100)
        mainWindow.webContents.openDevTools()
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.