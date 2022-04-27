<script>
	import { loginUserData, stateData } from "../store.js";
	import Editmode from "./editmode.svelte";
	import LogeedIn from "./logeedIn.svelte"
	import { browser } from '$app/env';
	import "../app.css";
	
	const userData = [
		{
			id: 'a', pwd: '123',
			name: '이씨', birth: '1968년 06월 23일',
			idPicture: 'Mr.Lee.jpeg'
		},
		{
			id: 'b', pwd: '345',
			name: '정씨', birth: '1968년 09월 19일',
			idPicture: 'Mr.chung.jpeg'
		}
	];

	let inputId = '';
	let inputPass = '';

	const CLICKCHECK = () => check.checked = !check.checked;

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
		if(!stateData.check) localStorage.setItem('ID', inputId);

		const findUser = checkUser(inputId, inputPass);

		let storageData;

		if(findUser && browser){ //login 가능한 상태
			console.log(findUser);
			loginUserData.userId = findUser.id;
			storageData = JSON.parse(localStorage.getItem(findUser.id));
			console.log(storageData);
			stateData.Editmode = !stateData.Editmode;
			console.log(stateData.Editmode)
			if(storageData){
				storageData.userId = findUser.id
				console.log(storageData)
				loginUserData.set(storageData)
				stateData.logged = true;
				stateData.errored =false;
			} else {
				loginUserData.set(findUser)
				stateData.logged = true;
				stateData.errored =false;
			}
		}
		else {
			stateData.errored = true;
		}
	}


</script>

<body>

	<main>

		{#if !stateData.logged}
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
							{#if stateData.errored }
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

		{#if stateData.logged}
			<LogeedIn/>
		{/if}

	</main>

</body>
