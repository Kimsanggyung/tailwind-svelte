<script>
 	import { browser } from '$app/env';
    import { loginUserData } from "../store.js";
    
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
		editMode = !editMode

		let setInfo = {
			name: inputName,
			birth: inputBirth,
			idPicture: inputPicture,
			pictureAlt: inputAlt
		}
		loginUserData.set(setInfo)
		console.log(setInfo)
		if(browser){
			console.log(loginUserData.userId)
			localStorage.setItem((loginUserData.userId), JSON.stringify(setInfo))
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
