<script>
	import { loginUserData, stateData } from "../store.js";
	import Editmode from "./editmode.svelte";
	import Login from "./login.svelte"
	import "../app.css";

	const editToggle = () => stateData.editMode = !stateData.editMode;
	
	const logoutButton = () =>{
		stateData.logged = !stateData.logged;
		if(stateData.editMode){
			stateData.editMode = !stateData.editMode
			console.log(stateData.editMode)
		}
	}

</script>

<main>
	{#if stateData.logged}
		<div class="loggedIn">
			<div>
				<h1 class="text-4xl w-90 px-4 py-2 mt-2 border rounded">이름: {$loginUserData.name}</h1>
				<h2 class="text-3xl w-90 px-4 py-2 mt-2 border rounded">생년월일: {$loginUserData.birth} </h2>
			</div>
			<img class="h-64 border rounded" src = {$loginUserData.idPicture} alt = {$loginUserData.name + " 회원님의 사진 입니다."}>
			<div>
				<button on:click={editToggle} class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-red-600">수정</button>
				<button on:click={logoutButton} class="px-6 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-blue-600">로그아웃</button>
			</div>
		</div>
	{/if}

	{#if stateData.editMode}
		<Editmode/>
	{/if}

	{#if !stateData.logged}
		<Login/>
	{/if}
</main>