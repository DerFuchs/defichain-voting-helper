<template>
	<div class="row">
		<div class="col-auto">
			<q-avatar
				color="accent"
				text-color="white"
				class="q-mr-sm"
				icon="fa-regular fa-hourglass-half"
				icon-color="primary"
			>
			</q-avatar>
		</div>
		<div class="col">
			<q-expansion-item
				header-class="jelly-gradient rounded-borders text-left text-white"
				expand-separator
				expand-icon="fa-solid fa-angle-down"
				:label="proposal.title"
			>
				<q-card flat :bordered="!basics.darkMode" class="text-center">
					<q-card-section class="row">
						<div class="col-6">
							<q-btn
								color="primary"
								unelevated
								label="Open Details (Reddit)"
								@click="openURL(proposal.context)"
							/>

							<q-btn
								@click="openURL('https://defiscan.live/governance')"
								label="View On DeFiScan"
								color="accent"
								class="q-mt-sm"
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
								(proposal.proposalEndHeight - chain.blockHeight).toLocaleString(
									"en-US"
								)
							}}<br />
						</div>
					</q-card-section>
					<q-separator class="jelly-gradient" />
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
			</q-expansion-item>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

import { openURL } from "quasar";

import { useBasicsStore } from "stores/basics";
import { useChainStore } from "stores/chain";

export default defineComponent({
	name: "ProposalItem",
	props: {
		proposal: {
			type: Object,
			required: true,
		},
	},
	setup() {
		const basics = useBasicsStore();
		const chain = useChainStore();

		// onBeforeMount(() => {
		// 	masternodes.fetch();
		// });

		// const runningProposals = computed(() => {
		// 	return proposals.all.filter((proposal) => proposal.status === "Voting");
		// });

		return {
			basics,
			chain,
			openURL,
			//masternodes,
		};
	},
});
</script>
