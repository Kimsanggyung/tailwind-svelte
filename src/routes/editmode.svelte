<script>
 	import { browser } from '$app/env';
    import { name, idPicture, birth, pictureAlt } from "../store.js";
    
    let	inputName = '';
	let inputBirth = '';
	let	inputPicture = '';
	let inputAlt = '';
	let editMode = false;
	

	const change = () => {
		name.set(inputName);
		birth.set(inputBirth);
		idPicture.set(inputPicture);
		pictureAlt.set(inputAlt);
		console.log(name);
		editMode = !editMode
		if(browser){
			localStorage.setItem('name', (inputName));
			localStorage.setItem('birth', (inputBirth));
			localStorage.setItem('img', (inputPicture));
			localStorage.setItem('alt', (inputAlt)); 
		}		
	}
</script>
    {#if !editMode}
    <input bind:value={inputName} type="text" placeholder='이름을 입력해 주세요.'> 
    <input bind:value={inputBirth} type="text" placeholder='생년월일을 입력해 주세요'>
    <input bind:value={inputPicture} type="text" placeholder='시진주소를 입력해 주세요.'>
    <input bind:value={inputAlt} type="text" placeholder="사진소개를 써주세요.">
    <button on:click={change}>등록</button>
	{/if}
	{#if browser}
    <button on:click={localStorage.clear()}>초기화</button>
	{/if}
