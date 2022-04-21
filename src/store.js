import { writable } from "svelte/store";

export const loginUserData = writable({
    name: '',
    birth: '',
    idPicture: '',
    pictureAlt: '',
    userId: ''
})

export const stateData = writable({
    check: false,
  	logged:  false,
  	errored: null,
    editMode: false
})

export const errorMessege = writable({
  nameError: '',
  birthError: '',
  imgError: '',
  altError: ''
})