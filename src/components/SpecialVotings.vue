<template>
	<div class="text-h6 q-pa-sm q-pl-md">
		Currently Running Special Votings
		<q-badge class="jelly-gradient" align="top">
			{{ proposals.emergency.length }}
		</q-badge>
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
							(proposal.proposalEndHeight - chain.blockHeight).toLocaleString(
								"en-US"
							)
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
				system. Your neutral vote will count as a no. This will get fixed in the
				future.
			</q-card-section>
		</q-card>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import { useBasicsStore } from "stores/basics";
import { useChainStore } from "stores/chain";
import { useProposalsStore } from "stores/proposals";

export default defineComponent({
	name: "SpecialVotings",
	setup() {
		const basics = useBasicsStore();
		const chain = useChainStore();
		const proposals = useProposalsStore();

		return {
			basics,
			chain,
			proposals,
		};
	},
});
</script>
