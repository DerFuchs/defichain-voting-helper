<template>
	<q-page class="q-pa-md" style="max-width: 800px; margin: 0 auto">
		<setup-wallet-connection />

		<!-- What's OCG? -->
		<expand-item name="ocgInfo" headline="What's On Chain Governance?">
			<p>
				It's the DeFiChain master nodes voting about proposals, made by members
				of the DeFiChain community.
			</p>
			More details & overviews to proposals:
			<q-btn
				@click="openURL('https://defiscan.live/governance')"
				label="On DeFiScan"
				color="accent"
				icon="fa-solid fa-link"
				dense
				size="sm"
			/>
			&nbsp;
			<q-btn
				@click="openURL('https://www.defichain-votings.com')"
				label="On DeFiChain-Votings.com"
				color="accent"
				class="q-my-sm"
				icon="fa-solid fa-link"
				dense
				size="sm"
			/>
			<p>
				If you don't know what you are doing, please consider asking in one of
				the official DeFiChain Telegram channels or on Twitter. The hard core of
				people loves to help out!
			</p>
			<p>
				If you don't own a DeFiChain master node, this software is useless for
				you. You're only eligable to vote when you're running a master node.
				<q-btn
					@click="openURL('https://www.defichainwiki.com/docs/auto/Masternode')"
					label="DeFiChain Wiki: Masternodes"
					color="accent"
					class="q-my-sm"
					icon="fa-solid fa-link"
					dense
					size="sm"
				/>
			</p>
		</expand-item>

		<div v-if="node.hasCredentials">
			<!-- List of Masternodes--->
			<masternode-list class="q-my-lg" />
		</div>

		<special-votings />

		<regular-votings />
	</q-page>
</template>

<script>
import { defineComponent, onBeforeMount, reactive } from "vue";

import { openURL } from "quasar";

import { useBasicsStore } from "stores/basics";
import { useNodeStore } from "stores/node";
import { useChainStore } from "stores/chain";
import { useProposalsStore } from "stores/proposals";
import { useMasternodesStore } from "stores/masternodes";

import SetupWalletConnection from "components/SetupWalletConnection.vue";
import MasternodeList from "components/MasternodeList.vue";
import SpecialVotings from "components/SpecialVotings.vue";
import RegularVotings from "components/RegularVotings.vue";

import ExpandItem from "components/Basics/ExpandItem.vue";

export default defineComponent({
	name: "OverviewPage",
	components: {
		ExpandItem,
		SetupWalletConnection,
		MasternodeList,
		SpecialVotings,
		RegularVotings,
	},
	setup() {
		const basics = useBasicsStore();
		const node = useNodeStore();
		const chain = useChainStore();
		const proposals = useProposalsStore();
		const masternodes = useMasternodesStore();

		const visibilities = reactive({
			ocgInfo: false,
		});

		onBeforeMount(() => {
			masternodes.fetch();
			proposals.fetch();
		});

		return {
			basics,
			node,
			chain,
			proposals,
			masternodes,
			visibilities,
			openURL,
		};
	},
});
</script>
