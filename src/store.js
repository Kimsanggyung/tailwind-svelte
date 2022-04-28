import { writable } from "svelte/store";

export const loginUserData = writable({
    name: '',
    birth: '',
    idPicture: '',
    userId: ''
})

export const stateData = writable({
    check: false,
    logged:  false,
    errored: null,
    editMode: false
})

export const storeUserData = writable([
    {
        id: 'a', pwd: '123',
        name: '이씨', birth: '1968년 06월 23일',
        idPicture: 'Mr.Lee.jpeg'
    },
    {
        id: 'b', pwd: '345',
        name: '정씨', birth: '1968년 09월 19일',
        idPicture: 'Mr.chung.jpeg'
    }
]);
