export function saveToLocalStorage(array, key){
    localStorage.setItem(key, JSON.stringify(array))
}