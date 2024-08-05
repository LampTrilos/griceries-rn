import axios from 'axios';

const firebaseUrl = 'https://test-f94ee-default-rtdb.europe-west1.firebasedatabase.app/groceryList';

export function axiosGet(url: string, timeout: number) {
    return  axios.get(firebaseUrl + '.json', {
        timeout: timeout // timeout in milliseconds (5000ms = 5s)
    })
}

export function axiosPost(url: string, item: Object) {
    return  axios.post(firebaseUrl + '.json', item)
}

export function axiosPut(url: string, item: Object) {
    //console.log(firebaseUrl + "/" + item.id +  '.json')
    return  axios.put(firebaseUrl + "/" + item.id +  '.json', item)
}


export function axiosDelete(url: string, id: string) {
    return  axios.delete(firebaseUrl + "/" + id + ".json")
}