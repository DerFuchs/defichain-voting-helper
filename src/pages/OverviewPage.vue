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
			<masternode-list />
		</div>

		<div class="text-h3">Proposals</div>

		<div class="row q-my-md">
			<q-card flat>
				<q-card-section class="text-h5"> Legend </q-card-section>
				<q-card-section horizontal>
					<q-card-section class="col-4">
						<div>
							<div class="q-mb-xs">
								<q-avatar
									size="xl"
									color="accent"
									text-color="white"
									class="q-mr-sm"
									icon="fa-regular fa-hourglass-half"
									icon-color="primary"
									style="margin-left: 4px"
								/>
								= not voted yet
							</div>
							<div class="q-mb-xs">
								<q-avatar
									size="xl"
									color="positive"
									text-color="white"
									class="q-mr-sm"
									icon="fa-regular fa-square-check"
									icon-color="primary"
									style="margin-left: 4px"
								/>
								= you voted yes
							</div>
							<div class="q-mb-xs">
								<q-avatar
									size="xl"
									color="grey"
									text-color="white"
									class="q-mr-sm"
									icon="fa-solid fa-ghost"
									icon-color="primary"
									style="margin-left: 4px"
								/>
								= you voted neutral
							</div>
							<div class="q-mb-xs">
								<q-avatar
									size="xl"
									color="negative"
									text-color="white"
									class="q-mr-sm"
									icon="fa-regular fa-rectangle-xmark"
									icon-color="primary"
									style="margin-left: 4px"
								/>
								= you voted no
							</div>
							<!-- <div>
									<q-icon
										size="md"
										color="primary"
										name="fa-solid fa-arrow-down"
									/>
								</div> -->
						</div>
					</q-card-section>
					<q-separator vertical class="jelly-gradient" inset />
					<q-card-section class="col q-pa-md">
						<p>
							When pressing one of the voting buttons, your decision will be
							sent to DeFiChain immediately by letting all of your master nodes
							vote with your decision. It takes until the next block for your
							voting to be written to the chain. So, please don't wonder when
							restarting the app right after voting and your decision is not
							reflected in the UI - It will! But it takes up to 5 minutes.
						</p>
						<p>
							You can change your decision at any time until the voting ends.
						</p>
						<p class="text-warning">
							Voting neutral is disabled due to a bug in DeFiChain's voting
							system. Your neutral vote will count as a no. This will get fixed
							in the future.
						</p>
					</q-card-section>
				</q-card-section>
			</q-card>
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
