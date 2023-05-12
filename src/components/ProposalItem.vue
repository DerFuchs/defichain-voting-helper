<template>
	<div class="row">
		<div class="col-auto">
			<q-avatar
				:color="decisionAvatar.color"
				text-color="white"
				class="q-mr-sm"
				:icon="decisionAvatar.icon"
			>
			</q-avatar>
		</div>
		<div class="col">
			<q-expansion-item
				header-class="jelly-gradient rounded-borders text-left text-white"
				expand-separator
				expand-icon="fa-solid fa-angle-down"
				:label="proposal.title"
				:model-value="type != 'regular'"
			>
				<q-card flat class="rounded-borders">
					<q-card-section horizontal>
						<q-card-section class="text-center" style="min-width: 320px">
							<p class="q-my-none q-py-none">Concluding In Approx.</p>
							<div class="text-h5 jelly-gradient-text">
								{{
									basics.timeLeft(
										((proposal.proposalEndHeight - chain.blockHeight) * 30) /
											60 /
											60
									)
								}}
							</div>
							<p>
								At Block
								<span class="text-primary">{{
									proposal.proposalEndHeight.toLocaleString("en-US")
								}}</span>
							</p>
							<p>
								<q-btn
									dense
									color="primary"
									unelevated
									label="Open Details (Reddit)"
									@click="openURL(proposal.context)"
									class="full-width"
									icon="fa-regular fa-window-restore"
								/>
								<br />
								<q-btn
									dense
									color="accent"
									unelevated
									@click="
										openURL(
											'https://defiscan.live/governance/' + proposal.proposalId
										)
									"
									label="View On DeFiScan"
									class="q-mt-sm full-width"
									icon="fa-regular fa-window-restore"
								/>
							</p>
						</q-card-section>

						<q-separator class="jelly-gradient" vertical inset />
						<q-card-section class="full-width">
							<div class="text-body1 q-mb-md" v-if="decision">
								Your Decision:
								<div class="q-my-md">
									<q-avatar
										:color="decisionAvatar.color"
										text-color="white"
										class="q-mr-sm"
										:icon="decisionAvatar.icon"
									>
									</q-avatar>
									<span class="text-h5 text-uppercase">{{ decision }}</span>
								</div>
								<q-btn
									@click="showVotingPanel = !showVotingPanel"
									class="full-width q-mt-md"
									size="md"
									unelevated
									outline
									color="warning"
									label="change decision"
									icon="fa-regular fa-pen-to-square"
								></q-btn>
							</div>
							<div class="text-body1 q-mb-md" v-else>Please Vote:</div>
							<div v-if="!decision || showVotingPanel">
								<q-btn
									class="full-width"
									size="lg"
									unelevated
									color="positive"
									label="Vote YES"
									icon="fa-regular fa-square-check"
									:loading="masternodes.active.length == 0"
									@click="
										vote(proposal.proposalId, 'yes');
										decision = 'yes';
									"
								/>

								<q-btn
									class="full-width q-my-sm"
									size="sm"
									unelevated
									color="grey"
									label="Vote NEUTRAL"
									icon="fa-solid fa-ghost"
									disable
									:loading="masternodes.active.length == 0"
									@click="
										vote(proposal.proposalId, 'neutral');
										decision = 'neutral';
									"
								/>

								<q-btn
									class="full-width"
									size="lg"
									unelevated
									color="negative"
									label="Vote NO"
									icon="fa-regular fa-rectangle-xmark"
									:loading="masternodes.active.length == 0"
									@click="
										vote(proposal.proposalId, 'no');
										decision = 'no';
									"
								/>
							</div>
						</q-card-section>
					</q-card-section>
					<q-card-section>
						<q-list bordered class="rounded-borders">
							<q-expansion-item
								header-class="text-left text-white"
								expand-separator
								expand-icon="fa-solid fa-angle-down"
							>
								<template #header>
									<div class="full-width text-body2" style="line-height: 2em">
										<q-spinner v-if="finishedTx.length != watchedTx.length" />
										<q-icon
											v-else
											name="fa-regular fa-calendar-check"
											color="positive"
											size="md"
										/>
										<span class="q-ml-md">
											{{ finishedTx.length }} out of
											{{ watchedTx.length }} confirmed
										</span>
									</div>
								</template>
								<q-list separator>
									<q-item v-for="txId in txIds" :key="txId">
										<q-item-section side>
											<q-spinner size="md" v-if="!isFinishedTx(txId)" />
											<q-icon
												v-else
												name="fa-regular fa-calendar-check"
											></q-icon>
										</q-item-section>
										<q-item-section class="text-caption">{{
											txId
										}}</q-item-section>
										<q-item-section side>
											<q-item-label caption>
												<q-btn
													color="primary"
													unelevated
													outline
													label="Defiscan"
													size="sm"
													@click="
														openURL(
															`https://defiscan.live/transactions/${txId}`
														)
													"
													class="full-width"
													icon="fa-regular fa-window-restore"
												/>
											</q-item-label>
										</q-item-section>
									</q-item>
								</q-list>
							</q-expansion-item>
						</q-list>
					</q-card-section>
				</q-card>
			</q-expansion-item>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, onBeforeMount, computed, watch } from "vue";

import { openURL } from "quasar";

import { useBasicsStore } from "stores/basics";
import { useNodeStore } from "stores/node";
import { useChainStore } from "stores/chain";
import { useMasternodesStore } from "stores/masternodes";
import { useProposalsStore } from "stores/proposals";

import { WhaleApiClient } from "@defichain/whale-api-client";

export default defineComponent({
	name: "SpecialProposalItem",
	props: {
		proposal: {
			type: Object,
			required: true,
		},
		type: {
			type: String,
			required: false,
			default: "regular",
		},
	},
	setup(props) {
		const basics = useBasicsStore();
		const node = useNodeStore();
		const chain = useChainStore();
		const masternodes = useMasternodesStore();
		const proposals = useProposalsStore();
		const decision = ref("undecided");
		const decisionAvatar = computed(() => {
			switch (decision.value) {
				case "yes":
					return {
						color: "positive",
						icon: "fa-regular fa-square-check",
					};
				case "neutral":
					return {
						color: "grey",
						icon: "fa-solid fa-ghost",
					};
				case "no":
					return {
						color: "negative",
						icon: "fa-regular fa-rectangle-xmark",
					};
				default:
					return {
						color: "accent",
						icon: "fa-regular fa-hourglass-half",
					};
			}
		});
		const showVotingPanel = ref(false);
		const txIds = ref([]);
		const finishedTx = ref([]);
		const watchedTx = ref([]);

		const hasNewTx = computed(() => {
			return txIds.value.length > finishedTx.value.length;
		});

		const isFinishedTx = computed(() => (txId) => {
			return finishedTx.value.includes(txId);
		});

		if (hasNewTx.value) {
			txIds.value.map((txId) => {
				watchTx(txId);
			});
		}

		watch(hasNewTx, (value) => {
			if (value) {
				txIds.value.map((txId) => {
					watchTx(txId);
				});
			}
		});

		function watchTx(txId) {
			if (watchedTx.value.includes(txId)) {
				return;
			} else {
				watchedTx.value.push(txId);
			}
			let interval = null;
			interval = setInterval(() => {
				ocean.transactions
					.get(txId)
					.then((data) => {
						finishedTx.value.push(txId);
						clearInterval(interval);
					})
					.catch((err) => {});
			}, 1000);
		}

		const ocean = new WhaleApiClient({
			url: "https://ocean.defichain.com",
			timeout: 60000,
			version: "v0",
			network: "mainnet",
		});
		const sendingDecisionsToChain = ref(false);

		async function vote(proposalId, decision) {
			sendingDecisionsToChain.value = true;
			txIds.value = await proposals.vote(proposalId, decision);
			console.log(txIds);
			sendingDecisionsToChain.value = false;
		}

		async function fetchDecision() {
			decision.value = await proposals.getUserVotes(props.proposal.proposalId);
		}

		onBeforeMount(() => {
			fetchDecision();
		});

		return {
			basics,
			chain,
			masternodes,
			openURL,
			vote,
			decision,
			decisionAvatar,
			showVotingPanel,
			txIds,
			finishedTx,
			watchedTx,
			isFinishedTx,
			fetchDecision,
		};
	},
});
</script>
