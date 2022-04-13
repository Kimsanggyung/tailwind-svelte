<script>

	import { name, idPicture, birth, pictureAlt } from "../store.js";
	import Editmode from "./editmode.svelte";
	import { browser } from '$app/env';
	import "../app.css";

	const userId = 'a';
	const passWord = '123';

	const userNo2 = 'b';
	const passNo2 = '345';

	let inputId = ''
	let inputPass = ''

	console.log(inputId)

	let logged = {loggedIn: false}
	
	let editMode = {editModeIn: false}

	const editToggle = () => editMode.editModeIn = !editMode.editModeIn

	const logoutButton = () =>{
		logged.loggedIn = !logged.loggedIn;
		if(editMode.editModeIn){
			editMode.editModeIn = !editMode.editModeIn
		}
	}

	let storageName, storageBirth, storageImg, storageAlt;

	if(browser){
		let storageId = localStorage.getItem('ID')

		if(storageId !== null){
			inputId = storageId
			console.log(inputId)
		}
		
		storageName = localStorage.getItem('name')
		storageBirth = localStorage.getItem('birth')
		storageImg = localStorage.getItem('img')
		storageAlt = localStorage.getItem('alt')
	}
	
	function logIn(){
		if(check.checked){
            localStorage.setItem('ID', inputId)
			console.log(inputId)
        }

		else if(userId == inputId && passWord === inputPass && storageName == null && storageBirth == null && storageImg == null && storageAlt == null){
			name.set('이씨')
			birth.set('1968년 6월 23일')
			idPicture.set('https://ww.namu.la/s/91986ffc01b6136fb453c4ff8b3e63adf90e525e6b10e1643058339c924830276d1fc646c2ac918d1f31e83c59308ea232acb64afb280dabeee0afc024b9dd3063662e1cc7dd5e8191c10ae35b0c811b')
			pictureAlt.set('Lee Jae-yong')
			logged.loggedIn = !logged.loggedIn,
			console.log('로그인 성공')
			console.log(inputId)
		}

		else if(userNo2 == inputId && passNo2 == inputPass){
			name.set('정씨')
			birth.set('1968년 9월 19일')
			idPicture.set('https://w.namu.la/s/2b83516ecb2360d95faa10f85763ad59ade34ede897311db5fc3a40256d7f1dd855bbf8eddb57c9fff4d4a24d070fd5ad625181926ea33915713e2351be1486fd1d510c24e5d05bc1f220991ec051010')
			pictureAlt.set('Chung Yong-jin')
			logged.loggedIn = !logged.loggedIn
			console.log('로그인 성공')
		}

		else if (browser && userId == inputId && passWord == inputPass && storageName !== null && storageBirth !== null && storageImg !== null && storageAlt !== null){
			name.set(storageName)
			birth.set(storageBirth)
			idPicture.set(storageImg)
			pictureAlt.set(storageAlt)
			logged.loggedIn = !logged.loggedIn
			console.log('로그인 성공')
		}

		else{
			document.getElementById('error').innerHTML = "아이디 또는 비밀번호가 옳지않습니다."
		}
	}

	let check = {checked: false}

    const CLICKCHECK = () => check.checked = !check.checked;

	console.log(inputId)

	function saveId(){
        if(check.checked && browser){
            localStorage.setItem('ID', inputId)
			console.log(inputId)
        }
    }

</script>
<body>

	<main>

		{#if !logged.loggedIn}
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
							{#if userNo2 !== inputId && passNo2 !== inputPass && userId !== inputId && passWord !== inputPass}
								<span class='text-red-600'>아이디 또는 비밀번호가 옳지않습니다.</span>
							{/if}
							<div class="flex items-baseline justify-between">
								<button onclick={logIn} class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">로그인</button>
								<label><input type="checkbox" on:click={CLICKCHECK} class="text-sm text-blue-600 hover:underline">아이디 저장</label>
							</div>
						</div>
				</div>
			</div>
		{/if}

		{#if logged.loggedIn}
			<div class="loggedIn">
				<h1>환영합니다 {$name} 회원님</h1>
				<h2>생년월일: {$birth} </h2>
				<img id="Lee" src = {$idPicture} alt = {$pictureAlt}>
				<button on:click={editToggle}>수정</button>
				<button on:click={logoutButton}>로그아웃</button>
			</div>
		{/if}

		{#if editMode.editModeIn}
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
