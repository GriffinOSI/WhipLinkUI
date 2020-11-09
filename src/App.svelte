<script> 
	import { urlList } from './stores.js';
	let destinationUrl ="";
	let generatedUrlList;
	let generatedUrl = "";
	let tempList = []
	
	urlList.subscribe(value => {
		generatedUrlList = value;
	});

	const submitUrl = async() => {
		const urlRequest = await fetch(`/.netlify/functions/createShortLink?destinationUrl=${destinationUrl}`, 
		{ headers: { accept: "Accept: application/json" } })
		let serviceResponse = await urlRequest.json()
		generatedUrl = "whi.pw/" + serviceResponse.data.generatedURL

		addUrlToList(destinationUrl, generatedUrl)
	}

	function addUrlToList(originalUrl, generatedURL) {
		tempList.push({originalUrl : originalUrl, generatedUrl: generatedUrl})
		urlList.set(tempList)
	}
</script>

<main>
	<h1>Link Shrinker</h1>
	<input
		placeholder="Shrink your link"
		type="text"
		name="destinationUrl"
		bind:value={destinationUrl}>
	<button on:click={submitUrl} >
		Shrink it
	</button>
	<ul>
		{#each generatedUrlList as shortLink}
			<li>{shortLink.originalUrl} -> <a href='http://www.{shortLink.generatedUrl}' >{shortLink.generatedUrl}</a>
		{/each}
	</ul>
</main>
<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	ul {
		list-style-type: none
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>