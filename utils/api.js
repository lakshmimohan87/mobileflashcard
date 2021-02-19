import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getDecks() {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if(value !== null) {
          return JSON.parse(value);
        }
        else{
            return {};
        }
  
      } catch(e) {
        alert("Error")
      }
}

export async function saveDecks(decks) {
    try{
        return AsyncStorage.setItem('@storage_Key', JSON.stringify(decks));
    }
    catch(e) {
        alert('Error: ' + e)
    }
}


export function deleteDeckAsync (id) {
    try{
        return AsyncStorage.getItem('@storage_Key').then((results) => {
            const data = JSON.parse(results)
            data[id] = undefined
            delete data[id]
            AsyncStorage.setItem('@storage_Key', JSON.stringify(data))
        })
    }
    catch(e){
        alert(e)
    }
    
        
}