<template>
	<q-page class="flex flex-center q-pa-md">
		<div>
			<div class="text-h6">DeFiChain Vote Helper</div>
			<p class="text-body1">
				Please read the following instructions and notes carfully before
				continuing:
			</p>
			<p>
				This application is used to streamline the voting process on DeFiChain -
				To make it easy and convienent to vote, even when running multiple
				masternodes.
			</p>
			<p>
				Therefore, this app has to communicate with the DeFiChain wallet running
				on your computer.
			</p>
			<p>
				For enabling the ability to vote by using this app, your wallet has not
				only to run but also to be unlocked manually by yourself. This is
				exactly the point where this app is getting dangerous.
			</p>
			<p>
				After being unlocked, this app can theoretically do with your wallet
				whatever you could do by yourself. This means: It could do transactions,
				send tokens, manipulate vaults and masternodes, etc.
			</p>
			<p>
				I as the developer of this app have clearly not implementet anything
				besides the pure voting process. But you can't be sure. You also could
				have been victim of a cyber attack and run a variant of this software
				which has been manipulated by an attacker.
			</p>
			<p>
				I as the developer of this app strongly advise against using it from a
				security point-of-view. I assume no liability for damages and losses of
				any kind. Use at your own risk.
			</p>
			<p class="text-warning bg-negative text-bold q-pa-sm">
				To be as clear as possible on that: THIS APP CAN POTENTIALLY BE HARMFUL
				TO YOUR WALLET AND YOUR FUNDS. YOU COULD LOSE ACCESS TO YOUR FUNDS. THEY
				CAN GET LOST EITHER BY A MALFUNCTION OR CAUSED BY MANIPULATION OF AN
				ATTACKER OR ANOTHER UNKNOWN CIRCUMSTANCE.
			</p>
			<p>
				<q-checkbox
					v-model="proceed"
					label="I have read the notices above. I am aware of the dangers. I can afford to lose everything."
				/>
			</p>
			<p>
				<q-btn
					color="primary"
					label="continue"
					:disable="!proceed"
					:to="{ name: 'overview' }"
				></q-btn>
			</p>
		</div>
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
