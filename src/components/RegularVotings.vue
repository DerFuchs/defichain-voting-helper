<template>
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
						When pressing one of the voting buttons, your decision will be sent
						to DeFiChain immediately by letting all of your master nodes vote
						with your decision. It takes until the next block for your voting to
						be written to the chain. So, please don't wonder when restarting the
						app right after voting and your decision is not reflected in the UI
						- It will! But it takes up to 5 minutes.
					</p>
					<p>You can change your decision at any time until the voting ends.</p>
					<p class="text-warning">
						Voting neutral is disabled due to a bug in DeFiChain's voting
						system. Your neutral vote will count as a no. This will get fixed in
						the future.
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
</template>

<script>
import { defineComponent } from "vue";
import { useProposalsStore } from "stores/proposals";

import ProposalItem from "components/ProposalItem.vue";

export default defineComponent({
	name: "RegularVotings",
	components: { ProposalItem },
	setup() {
		const proposals = useProposalsStore();

		return {
			proposals,
		};
	},
});
</script>
