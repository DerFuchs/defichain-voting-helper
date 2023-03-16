<template>
	<q-page class="q-pa-md" style="max-width: 800px">
		<setup-wallet-connection />

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
			<masternode-list class="q-my-lg" />

			<!-- --->
			<div
				v-if="proposals.emergency.length > 0"
				class="text-h6 q-mt-lg q-pa-sm q-pl-md"
			>
				Currently Running Emergency Votings
			</div>
			<q-separator
				v-if="proposals.emergency.length > 0"
				class="jelly-gradient q-mb-md"
			/>
			<div v-if="proposals.emergency.length > 0" class="q-mb-md">
				<q-card
					flat
					class="text-center"
					v-for="proposal in proposals.emergency"
					:key="proposal.proposalId"
				>
					<q-card-section
						class="jelly-gradient text-body1 text-uppercase text-white"
					>
						{{ proposal.title }}
					</q-card-section>
					<q-card-section class="text-white">
						<q-card-section class="row">
							<div class="col-6">
								<q-btn
									color="primary"
									unelevated
									label="Open Details (Reddit)"
									@click="openURL(proposal.context)"
								/>
								<br />
								<q-btn
									@click="openURL('https://defiscan.live/governance')"
									label="View On DeFiScan"
									color="primary"
									class="q-mt-sm"
									unelevated
								/>
							</div>
							<div class="col-6">
								Ending In Approx.<br />
								<div class="text-h5 text-primary">
									{{
										basics.timeLeft(
											((proposal.proposalEndHeight - chain.blockHeight) * 30) /
												60 /
												60
										)
									}}
								</div>
								<br />
								Ending At Block
								{{ proposal.proposalEndHeight.toLocaleString("en-US") }}<br />
								Blocks remaining:
								{{
									(
										proposal.proposalEndHeight - chain.blockHeight
									).toLocaleString("en-US")
								}}<br />
							</div>
						</q-card-section>
					</q-card-section>
					<q-separator class="jelly-gradient"></q-separator>
					<q-card-section class="row">
						<div class="col-12 text-body1 q-mb-md">Your Decision</div>
						<q-btn
							class="col-4"
							unelevated
							color="positive"
							label="YES"
							icon="fa-regular fa-square-check"
						/>
						<div class="col-4">
							<q-btn
								unelevated
								color="grey"
								label="NEUTRAL"
								icon="fa-solid fa-ghost"
								disable
								class="col-auto q-mx-xs"
							/>
						</div>
						<q-btn
							class="col-4"
							unelevated
							color="negative"
							label="NO"
							icon="fa-regular fa-rectangle-xmark"
						/>
					</q-card-section>
					<q-card-section>
						Voting neutral is not available due to a bug in DeFiChain's voting
						system. Your neutral vote will count as a no. This will get fixed in
						the future.
					</q-card-section>
				</q-card>
			</div>
			<div class="text-h6 q-pa-sm q-pl-md">
				Currently Running Regular Votings ({{ proposals.regular.length }})
			</div>
			<q-separator class="jelly-gradient q-mb-md" />
			<div class="row q-mb-md">
				<q-card flat>
					<q-card-section horizontal>
						<q-card-section class="col-4">
							<div>
								<div class="q-mb-xs">
									<q-avatar
										size="sm"
										color="accent"
										text-color="white"
										class="q-mr-sm"
										icon="fa-regular fa-hourglass-half"
										icon-color="primary"
										style="margin-left: 4px"
									/>
									not voted yet
								</div>
								<div class="q-mb-xs">
									<q-avatar
										size="sm"
										color="positive"
										text-color="white"
										class="q-mr-sm"
										icon="fa-regular fa-square-check"
										icon-color="primary"
										style="margin-left: 4px"
									/>
									you voted yes
								</div>
								<div class="q-mb-xs">
									<q-avatar
										size="sm"
										color="grey"
										text-color="white"
										class="q-mr-sm"
										icon="fa-solid fa-ghost"
										icon-color="primary"
										style="margin-left: 4px"
									/>
									you voted neutral
								</div>
								<div class="q-mb-xs">
									<q-avatar
										size="sm"
										color="negative"
										text-color="white"
										class="q-mr-sm"
										icon="fa-regular fa-rectangle-xmark"
										icon-color="primary"
										style="margin-left: 4px"
									/>
									you voted no
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
								sent to DeFiChain immediately by letting all of your master
								nodes vote with your decision.
							</p>
							<p>
								You can change your decision at any time until the voting ends.
							</p>
						</q-card-section>
					</q-card-section>
				</q-card>
			</div>

			<div class="row items-stretch q-col-gutter-md">
				<div
					class="col-12"
					v-for="proposal in proposals.regular"
					:key="proposal.proposalId"
				>
					<proposal-item :proposal="proposal" />
				</div>
			</div>
		</div>
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
import ProposalItem from "components/ProposalItem.vue";

import ExpandItem from "components/Basics/ExpandItem.vue";

export default defineComponent({
	name: "OverviewPage",
	components: {
		SetupWalletConnection,
		MasternodeList,
		ProposalItem,
		ExpandItem,
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
