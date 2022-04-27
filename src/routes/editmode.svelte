<script>
	import { browser } from '$app/env';
	import { loginUserData, stateData, errorMessege } from "../store.js";

	let infoData;

	loginUserData.subscribe(value =>{
		infoData = value
	})
	console.log(infoData)

	let	inputName = infoData.name;
	let inputBirth = infoData.birth;
	let	inputPicture = infoData.idPicture;
	let error = {
			nameError: '',
			birthError: '',
			imgError: '',
			}
			
	console.log(loginUserData)
	const reset = () => {
		localStorage.clear()
		stateData.editMode = !stateData.editMode
	}

	const change = () => {
		
		const checkBirth = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;
		const checkDefault = /^(19[0-9][0-9]|20\d{2})년\s(0[0-9]|1[0-2])월\s(0[1-9]|[1-2][0-9]|3[0-1])일$/
		const checkStr = /^[가-힣a-zA-Z]+$/
				
		if(inputName == ''){
			error["nameError"] = "이름을 입력해주세요."
			errorMessege.set(error);
		}else if(!checkStr.test(inputName)){
			error["nameError"] = "이름은 한글, 영문만 입력 가능합니다."
			errorMessege.set(error);
		}else{
			error["nameError"] = "";
			errorMessege.set(error);
		}

		if(inputBirth == ''){
			error['birthError'] = '생년월일 8자리를 입력해주세요.'
			errorMessege.set(error);
		}else if(!checkBirth.test(inputBirth) && !checkDefault.test(inputBirth)){
			error['birthError'] = '올바른 생년월일 8자리를 입력해주세요.'
			errorMessege.set(error);
		}else if(checkBirth.test(inputBirth)){
			inputBirth = inputBirth.replace(/(\d{4})(\d{2})(\d{2})/, '$1년 $2월 $3일')
			console.log(inputBirth)
			error["birthError"] = ""
			errorMessege.set(error);
		}

		if(inputPicture == ''){
			error['imgError'] ='사진 주소를 입력주세요.'
			errorMessege.set(error)
		}else{
			error['imgError'] =''
			errorMessege.set(error)
		}

		let setInfo = {
			name: inputName,
			birth: inputBirth,
			idPicture: inputPicture
		}

		if(error.nameError == '' && error.birthError == '' && error.imgError == ''){
			loginUserData.set(setInfo)
			console.log(setInfo)
			console.log(error)
		}

		if(browser && error.nameError == '' && error.birthError == '' && error.imgError == ''){
			stateData.editMode = !stateData.editMode
			console.log(loginUserData.userId)
			localStorage.setItem(loginUserData.userId , JSON.stringify(setInfo))
		}
	}

</script>
	{#if stateData.editMode && browser} 
		<div>	
			<input bind:value={inputName} type="text" placeholder='이름을 입력해 주세요.' class="w-60 h-12 text-lg"> 
			<span class='text-red-600 text-lg'>{error.nameError}</span>
		</div>

		<div>
			<input bind:value={inputBirth} type="text" placeholder='생년월일 8자리를 입력해 주세요.' class="w-60 h-12 text-lg">
			<span class='text-red-600 text-lg'>{$errorMessege.birthError}</span>
		</div>

		<div>
			<input bind:value={inputPicture} type="text" placeholder='시진주소를 입력해 주세요.' class="w-60 h-12 text-lg">
			<span class='text-red-600 text-lg'>{$errorMessege.imgError}</span>
		</div>

		<button on:click={change} class="text-xl">등록</button>
		<button on:click={reset} class="text-xl">초기화</button>
	{/if}

