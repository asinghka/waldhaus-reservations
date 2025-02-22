const { ipcRenderer, contextBridge } = require('electron');

// Expose safe methods to renderer (React)
contextBridge.exposeInMainWorld('electron', {
    getReservations: () => ipcRenderer.invoke('get-reservations'),
    saveReservation: (reservation) => ipcRenderer.invoke('save-reservation', reservation),
    updateReservation: (reservation) => ipcRenderer.invoke('update-reservation', reservation),
})