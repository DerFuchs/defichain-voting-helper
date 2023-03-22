<template>
	<q-page class="flex flex-center q-pa-md">
		<q-card flat>
			<q-card-section>
				<div class="text-h5">Before You Proceed</div>
				<q-separator class="jelly-gradient" />
				<p class="text-body1 q-mt-sm">
					Please read the following notes carfully.
				</p>
				<p>
					This application is used to streamline the voting process on DeFiChain
					- To make it easy and convienent to vote, even when running multiple
					masternodes.
				</p>
				<p>
					Therefore, this app has to communicate with the DeFiChain wallet
					running on your computer.
				</p>
				<p>
					For enabling the ability to vote by using this app, your wallet has
					not only to run but also to be unlocked manually by yourself. This is
					the point where this app is getting dangerous.
				</p>
				<p class="text-h6">Risks Involved</p>
				<p>
					After being unlocked, this app could do anything with your wallet.
					This means: It could perform transactions, send tokens, manipulate
					vaults and masternodes, etc.
				</p>
				<p>
					This app has clearly not implementet any writing actions besides the
					pure voting process. But you can't be sure. You also could have been
					victim of a cyber attack and run a variant of this software which has
					been manipulated by an attacker.
				</p>
				<p class="text-h6">Use at your own risk</p>
				<p>
					It is strongly discouraged to use this app from a security
					point-of-view. The developer of this app assumes no liability for
					damages and losses of any kind.
				</p>
				<p class="text-warning bg-negative text-bold q-pa-sm">
					To be as clear as possible on that: THIS APP CAN POTENTIALLY BE
					HARMFUL TO YOUR WALLET AND YOUR FUNDS. YOU COULD LOSE ACCESS TO YOUR
					FUNDS. THEY CAN GET LOST EITHER BY A MALFUNCTION OR CAUSED BY
					MANIPULATION OF AN ATTACKER OR ANOTHER UNKNOWN CIRCUMSTANCE.
				</p>
				<p>
					<q-checkbox
						v-model="proceed"
						label="I have read the notices above. I am aware of the dangers. I can afford to lose everything."
					/>
				</p>
				<p>
					<q-btn
						unelevated
						color="primary"
						label="continue"
						:disable="!proceed"
						:to="{ name: 'overview' }"
					></q-btn>
				</p>
			</q-card-section>
		</q-card>
	</q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "IndexPage",
	setup() {
		const proceed = ref(false);
		return {
			proceed,
		};
	},
});
</script>
