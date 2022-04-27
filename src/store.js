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