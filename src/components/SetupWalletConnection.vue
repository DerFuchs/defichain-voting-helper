<template>
	<expand-item name="setup" headline="Setup Wallet Connection">
		<p>
			This app is not able to read from your computer's local file system for
			security reasons. Therefore, you have to fill in the access key for the
			DeFiChain Node, running alongside your DeFiChain Full Wallet. No need for
			panic! It's easy!
		</p>
		<p class="q-mb-xs">Open Finder and navigate to the file:</p>
		<i>~/Library/Application Support/Defi/.defi/defi.conf</i>
		<p class="q-mt-xs">
			Alternatively, open Finder, have a look at the menu bar and choose "Go To"
			=> "Go To Folder" and paste in the path from above.
		</p>
		<p>
			Open the file <i>defi.conf</i> with a text editor like "Text Edit"
			(right-click => open => "TextEdit.app")
		</p>
		<p>Find these two values and put their values in these text fields:</p>
		<q-input v-model="rpcauth" outlined type="text" label="rpcauth" />
		<q-input
			v-model="rpcport"
			outlined
			type="text"
			label="rpcport"
			class="q-mt-xs"
		/>
		<q-checkbox
			v-model="keepCredentials"
			:model-value="node.credentialsLoadedFromLocalStorage"
			label="keep credentials for next time"
		/>
		<br />
		<q-btn
			unelevated
			color="primary"
			:label="keepCredentials ? 'save &amp; connect' : 'connect'"
			@click="saveCredentials"
		></q-btn>
	</expand-item>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from "vue";

import { useNodeStore } from "stores/node";
import { useChainStore } from "stores/chain";
import { useMasternodesStore } from "stores/masternodes";
import { useProposalsStore } from "stores/proposals";

import ExpandItem from "components/Basics/ExpandItem.vue";

export default defineComponent({
	name: "SetupWalletConnection",
	components: { ExpandItem },
	setup() {
		const node = useNodeStore();
		const chain = useChainStore();
		const masternodes = useMasternodesStore();
		const proposals = useProposalsStore();

		const rpcauth = ref("");
		const rpcport = ref("");
		const keepCredentials = ref(false);

		onBeforeMount(() => {
			rpcauth.value = node.rpcauth;
			rpcport.value = node.rpcport;
		});

		function saveCredentials() {
			node.setRpcAuth(rpcauth.value, keepCredentials.value);
			node.setRpcPort(rpcport.value, keepCredentials.value);
			fetchEverything();
		}

		function fetchEverything() {
			chain.fetchBlockHeight();
			masternodes.fetch();
			proposals.fetch();
		}

		return {
			node,
			rpcauth,
			rpcport,
			keepCredentials,
			saveCredentials,
			//basics,
			//chain,
		};
	},
});
</script>
