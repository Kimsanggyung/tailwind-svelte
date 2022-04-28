<script>
	import { browser } from '$app/env';
	import { loginUserData, stateData, storeUserData } from "../store.js";

	let	inputName;
	let inputBirth;
	let	inputPicture;
	let error = {
			nameError: '',
			birthError: '',
			imgError: '',
			};
	let  image, avatar;

	loginUserData.subscribe(value =>{
		inputName = value.name;
		inputBirth = value.birth;
		inputPicture = value.idPicture;
	})

	let userData;
	storeUserData.subscribe(value =>{
		userData = value;
	})
	const checkUser = (id) => {
		const findUser = userData.find(user => user.id === id)
		return findUser;
	}
	const loginUser = localStorage.getItem('loginUser');
	const findUser = checkUser(loginUser);
	
	const onFileSelected = (i) =>{
  	image = i.target.files[0];
		inputPicture = image.name
		let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = i => {
			avatar = i.target.result
		}; 	
	}
	console.log(stateData.editMode)
	const reset = () => {
		loginUserData.set(findUser);
		stateData.editMode = !stateData.editMode
		console.log(stateData.editMode);
		console.log(findUser)
	}

	const localstorageReset = () =>{
		localStorage.clear();
	}

	const change = () => {
		
		const checkBirth = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;
		const checkDefault = /^(19[0-9][0-9]|20\d{2})년\s(0[0-9]|1[0-2])월\s(0[1-9]|[1-2][0-9]|3[0-1])일$/
		const checkStr = /^[가-힣a-zA-Z]+$/
		const checkFile = /\.(bmp|gif|jpg|jpeg|png)$/i
		const checkBase64 = /^(data)/

		if(inputName == ''){
			error["nameError"] = "이름을 입력해주세요."
		}else if(!checkStr.test(inputName)){
			error["nameError"] = "이름은 한글, 영문만 입력 가능합니다."
		}else{
			error["nameError"] = "";
		}

		if(inputBirth == ''){
			error['birthError'] = '생년월일 8자리를 입력해주세요.'
		}else if(!checkBirth.test(inputBirth) && !checkDefault.test(inputBirth)){
			error['birthError'] = '올바른 생년월일 8자리를 입력해주세요.'
		}else if(checkBirth.test(inputBirth)){
			inputBirth = inputBirth.replace(/(\d{4})(\d{2})(\d{2})/, '$1년 $2월 $3일')
			console.log(inputBirth)
			error["birthError"] = ""
		}

		if(inputPicture == ''){
			error['imgError'] ='사진 주소를 입력해주세요.'
		}else if(!checkFile.test(inputPicture) && !checkBase64.test(inputPicture)){
			error["imgError"] = '올바른 사진파일을 입력해주세요.'
		}else{
			error['imgError'] =''
		}

		let setInfo = {
			name: inputName,
			birth: inputBirth,
			idPicture: inputPicture
		}
		if(avatar){
			setInfo.idPicture = avatar
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
			<span class="text-xl">이름:</span>
			<input bind:value={inputName} type="text" placeholder='이름을 입력해 주세요.' class="w-60 h-12 text-lg"> 
			<span class='text-red-600 text-lg'>{error.nameError}</span>
		</div>

		<div>
			<span class="text-xl">생년월일:</span>
			<input bind:value={inputBirth} type="text" placeholder='생년월일 8자리를 입력해 주세요.' class="w-60 h-12 text-lg">
			<span class='text-red-600 text-lg'>{error.birthError}</span>
		</div>

		<div>
			<span class="text-xl">사진:</span>
			<input bind:value={inputPicture} type="text" placeholder='시진주소를 입력해 주세요.' class="w-40 h-12 text-lg">
			<input type="file" id='imgFile' on:change={(i)=>onFileSelected(i)}>
			<span class='text-red-600 text-lg'>{error.imgError}</span>
		</div>

		<div>
			<button on:click={change} class="text-xl">등록</button>
			<button on:click={reset} class="text-xl">초기화</button>
		</div>

		<button on:click={localstorageReset} class="text-xl text-red-900">localestorageReset</button>
	{/if}

