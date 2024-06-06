type localResume = {
    name: string
    resume: string
    id: number
  }

type api_key = {
    key: string
    isActive: boolean
    id: number
    encryptedKey: string
}

type payload = localResume | api_key;

export const getFromLocalStorage = (storageKey: string) => {
    const inLocalStorage = localStorage.getItem(storageKey);
    if (inLocalStorage) {
        const keys = JSON.parse(inLocalStorage);
        return keys;
    }
    return []
}

export const saveToLocalStorage = (storageKey: string, payload: payload) => {
    const inLocalStorage = getFromLocalStorage(storageKey);
    localStorage.setItem(storageKey, JSON.stringify([...inLocalStorage, payload]))
}

export const removeFromLocalStorage = (storageKey: string, payload: payload) => {
    const inLocalStorage = getFromLocalStorage(storageKey);
    const updatedKeys = inLocalStorage.filter((a: payload) => a.id !== payload.id)
    localStorage.setItem(storageKey, JSON.stringify(updatedKeys))
}