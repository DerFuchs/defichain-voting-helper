<template>
	<q-toolbar
		class="text-h6 q-mt-md"
		style="cursor: pointer"
		@click="expanded = !expanded"
	>
		<span>{{ headline }}</span>
		<q-space></q-space>
		<q-btn
			flat
			dense
			round
			icon="fa-solid fa-angle-down"
			:class="{ 'rotate-180': expanded }"
			style="transition: transform 0.3s"
		/>
	</q-toolbar>
	<q-separator class="jelly-gradient q-mb-md" />

	<q-slide-transition>
		<q-card flat v-show="expanded">
			<q-card-section>
				<slot name="default"></slot>
			</q-card-section>
		</q-card>
	</q-slide-transition>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "ExpandItem",
	props: {
		name: {
			type: String,
			required: true,
		},
		headline: {
			type: String,
			required: true,
		},
	},

	setup() {
		const expanded = ref(false);
		return {
			expanded,
		};
	},
});
</script>
