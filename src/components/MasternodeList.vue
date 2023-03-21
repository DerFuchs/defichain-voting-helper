<template>
	<expand-item
		name="masternodes"
		:headline="
			masternodes?.active?.length > 0
				? 'Your Masternodes (' + masternodes.active.length + ')'
				: 'Your Masternodes'
		"
	>
		<q-list separator>
			<q-item v-for="(mn, index) in masternodes.active" :key="mn.id">
				<q-item-section avatar>
					<q-avatar color="primary" class="text-h6 jelly-gradient">
						#{{ index + 1 }}
					</q-avatar>
				</q-item-section>
				<q-item-section>
					<q-item-label> Owner: {{ mn.ownerAuthAddress }} </q-item-label>
					<q-item-label caption lines="2">
						ID: {{ mn.id }}<br />
						Operator:
						{{ mn.operatorAuthAddress }}
					</q-item-label>
				</q-item-section>
			</q-item>
		</q-list>

		<q-inner-loading
			:showing="masternodes.fetching"
			label="counting your masternodes"
		/>
	</expand-item>
</template>

<script>
import { defineComponent, computed, onBeforeMount } from "vue";
import { useNodeStore } from "stores/node";
import { useMasternodesStore } from "stores/masternodes";

import ExpandItem from "components/Basics/ExpandItem.vue";

export default defineComponent({
	name: "MasternodeList",
	components: { ExpandItem },
	setup() {
		const node = useNodeStore();
		const masternodes = useMasternodesStore();

		onBeforeMount(() => {
			if (node.hasCredentials) {
				masternodes.fetch();
			}
		});

		const runningProposals = computed(() => {
			return proposals.all.filter((proposal) => proposal.status === "Voting");
		});

		return {
			masternodes,
		};
	},
});
</script>
