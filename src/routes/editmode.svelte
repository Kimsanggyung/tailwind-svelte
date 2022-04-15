<script>
 	import { browser } from '$app/env';
    import { name, idPicture, birth, pictureAlt } from "../store.js";
    
    let	inputName = '';
	let inputBirth = '';
	let	inputPicture = '';
	let inputAlt = '';
	let editMode = false;

	const reset = () => {
		localStorage.clear()
		editMode = !editMode
	}

	const change = () => {
		name.set(inputName);
		birth.set(inputBirth);
		idPicture.set(inputPicture);
		pictureAlt.set(inputAlt);
		console.log(name);
		editMode = !editMode

		let setInfo = {
			name: inputName,
			birth: inputBirth,
			img: inputPicture,
			alt: inputAlt
		}
		console.log(setInfo)
		if(browser){
			localStorage.setItem('ID-a', JSON.stringify(setInfo))
		}		
	}

	
</script>
    {#if !editMode && browser} 
    <input bind:value={inputName} type="text" placeholder='이름을 입력해 주세요.'> 
    <input bind:value={inputBirth} type="text" placeholder='생년월일을 입력해 주세요'>
    <input bind:value={inputPicture} type="text" placeholder='시진주소를 입력해 주세요.'>
    <input bind:value={inputAlt} type="text" placeholder="사진소개를 써주세요.">
    <button on:click={change}>등록</button>
    <button on:click={reset}>초기화</button>
	{/if}
