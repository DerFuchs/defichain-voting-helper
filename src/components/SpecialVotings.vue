<template>
	<div v-if="proposals.special.length > 0">
		<div class="text-h6 q-pa-sm q-pl-md">
			Currently Running Special Votings
			<q-badge class="jelly-gradient" align="top">
				{{ proposals.special.length }}
			</q-badge>
		</div>
		<q-separator class="jelly-gradient q-mb-md" />
		<div v-if="proposals.special.length > 0">
			<proposal-item
				v-for="proposal in proposals.special"
				:key="proposal.proposalId"
				:proposal="proposal"
				type="special"
				class="q-mb-md"
			/>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import { useProposalsStore } from "stores/proposals";

import ProposalItem from "src/components/ProposalItem.vue";

export default defineComponent({
	name: "SpecialVotings",
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
