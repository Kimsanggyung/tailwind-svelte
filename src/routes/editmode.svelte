<script>
	import { browser } from '$app/env';
	import { loginUserData, stateData, errorMessege } from "../store.js";
   
	let	inputName = loginUserData.name;
	let inputBirth = loginUserData.birth;
	let	inputPicture = loginUserData.idPicture;
	let inputAlt = loginUserData.pictureAlt;

	console.log(loginUserData)
	const reset = () => {
		localStorage.clear()
		stateData.editMode = !stateData.editMode
	}

	const change = () => {
		
		const checkNum = /^[0-9]+$/;
		const checkLength = /^[0-9]{8,8}$/;
		let error = {
				nameError: '',
  				birthError: '',
  				imgError: '',
  				altError: ''
			}
		
		console.log(loginUserData.name)
		
		if(inputName == ''){
			error["nameError"] = "이름을 입력해주세요."
			errorMessege.set(error);
		}else{
			error["nameError"] = "";
			errorMessege.set(error);
		}

		if(inputBirth == ''){
			error['birthError'] = '생년월일 8자리를 입력해주세요.'
			errorMessege.set(error);
		}else if(!checkNum.test(inputBirth)){
			error['birthError'] = '생년월일은 숫자만 입력할 수 있습니다.'
			errorMessege.set(error);
		}else if(!checkLength.test(inputBirth)){
			error['birthError'] = '생년월일은 8자리로 입력해주세요.'
			errorMessege.set(error);
		}else{
			error["birthError"] = ""
			errorMessege.set(error);
		}

		if(inputPicture == ''){
			error['imgError'] ='사진 주소를 입략력주세요.'
			errorMessege.set(error)
		}else{
			error['imgError'] =''
			errorMessege.set(error)
		}

		if(inputAlt == ''){
			error['altError'] ='사진 소개를 입략해주세요.'
			errorMessege.set(error)
		}else{
			error['altError'] =''
			errorMessege.set(error)
		}


		let setInfo = {
			name: inputName,
			birth: inputBirth,
			idPicture: inputPicture,
			pictureAlt: inputAlt
		}

		loginUserData.set(setInfo)
		console.log(setInfo)
		console.log(error)
		
		
		if(browser){
			stateData.editMode = !stateData.editMode
			console.log(loginUserData.userId)
			localStorage.setItem(loginUserData.userId , JSON.stringify(setInfo))
		}
	}
	

</script>
	{#if stateData.editMode && browser} 
		<div>	
			<input bind:value={inputName} type="text" placeholder='이름을 입력해 주세요.' class="w-60 h-12 text-lg"> 
			<span class='text-red-600 text-lg'>{$errorMessege.nameError}</span>
		</div>

		<div>
			<input bind:value={inputBirth} type="text" placeholder='생년월일 8자리를 입력해 주세요.' class="w-60 h-12 text-lg">
			<span class='text-red-600 text-lg'>{$errorMessege.birthError}</span>
		</div>
			<input bind:value={inputPicture} type="text" placeholder='시진주소를 입력해 주세요.' class="w-60 h-12 text-lg">
			<span class='text-red-600 text-lg'>{$errorMessege.imgError}</span>
		<div>
			<input bind:value={inputAlt} type="text" placeholder="사진소개를 써주세요."	class="w-60 h-12 text-lg">
			<span class='text-red-600 text-lg'>{$errorMessege.altError}</span>
		</div>

		<button on:click={change} class="text-xl">등록</button>
		<button on:click={reset} class="text-xl">초기화</button>
	{/if}
	
	

