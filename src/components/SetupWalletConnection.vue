<template>
	<expand-item
		name="setup"
		headline="Set Up Wallet Connection"
		:force-expand="!node.hasCredentials"
	>
		<p>
			This app is not able to read from your computer's local file system for
			security reasons. Therefore, you have to fill in the access key for the
			DeFiChain Node, running alongside your DeFiChain Full Wallet. No need for
			panic! It's easy!
		</p>
		<div v-if="platform.is.win">
			<p class="q-mb-xs">Open Explorer and navigate to the file:</p>
			<i>C:\Users\username\.defi\defi.conf</i>
			<p>
				Open the file <i>defi.conf</i> with a text editor like "Notepad"
				(right-click => open with => "Nodepad")
			</p>
		</div>
		<div v-if="platform.is.mac">
			<ol>
				<li>
					<p class="q-mt-xs">
						Open Finder, have a look at the menu bar and choose
						<i>"Go To"</i> => <i>"Go To Folder"</i>, paste the following in and hit enter:
            <pre class="q-pa-sm bg-black text-white">
~/Library/Application Support/Defi/.defi/defi.conf
            </pre>
						<q-btn
							dense
							color="accent"
							size="sm"
							@click="
								copyToClipboard(
									'~/Library/Application Support/Defi/.defi/defi.conf'
								)
							"
							icon="fa-regular fa-clipboard"
							label="copy to clipboard"
						/>

					</p>
				</li>
				<li>
					<p>
						Open the file <i>defi.conf</i> with a text editor like "Text Edit"
						(right-click => open => "TextEdit.app")
					</p>
				</li>
				<li>
					<p>Find <i>rpcauth</i> and <i>rpcport</i> keys. They look like:</p>
					<pre class="q-pa-sm bg-black text-white">
rpcauth=fOdwcsXB:nvg5oc9722r3jqm4cz9ncqlf9n64rit6h4inq71pis4zfrry8cav295bf5aq0h60
rpcport=8554
          </pre>
				</li>
				<li>
					<p>
						Copy everything after the equals sign (=) and paste into these text
						fields:
					</p>
				</li>
			</ol>
		</div>
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
			:model-value="node.credentialsLoadedFromLocalStorage || keepCredentials"
			label="keep credentials for next time (it's safe)"
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

import { useQuasar, copyToClipboard } from "quasar";

import { useNodeStore } from "stores/node";
import { useChainStore } from "stores/chain";
import { useMasternodesStore } from "stores/masternodes";
import { useProposalsStore } from "stores/proposals";

import ExpandItem from "components/Basics/ExpandItem.vue";

export default defineComponent({
	name: "SetupWalletConnection",
	components: { ExpandItem },
	setup() {
		const $q = useQuasar();

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
			platform: $q.platform,
			node,
			rpcauth,
			rpcport,
			keepCredentials,
			saveCredentials,
			copyToClipboard,
		};
	},
});
</script>
