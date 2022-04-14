<script>
	import { name, idPicture, birth, pictureAlt } from "../store.js";
	import Editmode from "./editmode.svelte";
	import { browser } from '$app/env';
	import "../app.css";
	
	const userData = [
		{ 
			id: 'a', pwd: '123',
			name: '이씨', birth: '1968년 6월 23일',
			img: 'Mr.Lee.jpeg', imgAlt: 'Lee Jae-yong'
		},
		{ 
			id: 'b', pwd: '345',
      		name: '정씨', birth: '1968년 9월 19일',
			img: 'Mr.chung.jpeg', imgAlt: 'Chung Yong-jin'
		}
	];

	let check = {checked: false}
  	let logged = false;
	let editMode = false;
  	let errored = null;
	let inputId = '';
	let inputPass = '';

	const CLICKCHECK = () => check.checked = !check.checked;

  	const editToggle = () => editMode = !editMode;
	
	const logoutButton = () =>{
		logged = !logged;
		if(editMode){
			editMode = !editMode
		}
	}
  
	if(browser){
		let storageId = localStorage.getItem('ID');
		if(storageId !== null){
			inputId = storageId
			console.log(inputId)
		}

	}

	const checkUser = (id, pwd) => {
		const findUser = userData.find(user => user.id === id && user.pwd === pwd)
		return findUser;
	}
	
	const logIn = () => {
    if(check.checked) localStorage.setItem('ID', inputId);

    const findUser = checkUser(inputId, inputPass);

    if(findUser && browser){ //login 가능한 상태
		name.set(findUser.name);
		birth.set(findUser.birth);
      	idPicture.set(findUser.img);
      	pictureAlt.set(findUser.imgAlt);
      	logged = true;
      	errored =false;
		localStorage.setItem('Key', (inputId))
	} else {
		errored = true;
	}
}


	if(browser){
		let storageData = {
		key: localStorage.getItem('Key'),
		storageName: localStorage.getItem('name'),
		storageBirth: localStorage.getItem('birth'),
		storageImg: localStorage.getItem('img'),
		storageAlt: localStorage.getItem('alt')
		}
		console.log(storageData)
	}

</script>
<body>

	<main>

		{#if !logged}
			<div class="flex items-center justify-center min-h-screen bg-gray-100">
				<div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
					<h3 class="text-2xl font-bold text-center">로그인</h3>
						<div class="mt-4">
							<div>
								<input bind:value={inputId} type="text" placeholder="아이디"
									class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
							</div>
							<div class="mt-4">
								<input bind:value={inputPass} type="password" placeholder="비밀번호"
									class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
							</div>
							{#if errored }
								<span class='text-red-600'>아이디 또는 비밀번호가 옳지않습니다.</span>
							{/if}
							<div class="flex items-baseline justify-between">
								<button on:click={logIn} class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">로그인</button>
								<label><input type="checkbox" on:click={CLICKCHECK} class="text-sm text-blue-600 hover:underline">아이디 저장</label>
							</div>
						</div>
				</div>
			</div>
		{/if}

		{#if logged}
			<div class="loggedIn">
				<h1>환영합니다 {$name} 회원님</h1>
				<h2>생년월일: {$birth} </h2>
				<img id="Lee" src = {$idPicture} alt = {$pictureAlt}>
				<button on:click={editToggle}>수정</button>
				<button on:click={logoutButton}>로그아웃</button>
			</div>
		{/if}

		{#if editMode}
			<Editmode/>
		{/if}

	</main>

</body>

<style>
#Lee{
	width: 175px;
	height: 269px;
}
</style>