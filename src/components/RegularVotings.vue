<template>
	<div class="text-h6 q-pa-sm q-pl-md">
		Currently Running Regular Votings
		<q-badge class="jelly-gradient" align="top">
			{{ proposals.regular.length }}
		</q-badge>
	</div>
	<q-separator class="jelly-gradient q-mb-md" />

	<div class="row items-stretch q-col-gutter-md">
		<div
			class="col-12"
			v-for="proposal in proposals.regular"
			:key="proposal.proposalId"
		>
			<proposal-item :proposal="proposal" />
			<!-- <proposal-item :proposal="proposal" /> -->
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import { useProposalsStore } from "stores/proposals";

import ProposalItem from "components/ProposalItem.vue";

export default defineComponent({
	name: "RegularVotings",
	components: {
		ProposalItem,
	},
	setup() {
		const proposals = useProposalsStore();

		return {
			proposals,
		};
	},
});
</script>
