import { writable } from "svelte/store";

export const loginUserData = writable({
    name: '',
    birth: '',
    idPicture: '',
    pictureAlt: '',
    userId: ''
})