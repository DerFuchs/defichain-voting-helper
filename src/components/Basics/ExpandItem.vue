<template>
	<q-toolbar
		class="text-h6 q-mt-md"
		style="cursor: pointer"
		@click="expanded = !expanded"
	>
		<span>
			{{ headline }}
			<slot name="headline"></slot>
		</span>
		<q-space></q-space>
		<q-btn
			flat
			dense
			icon="fa-solid fa-angle-down"
			:class="{ 'rotate-180': expanded }"
			style="transition: transform 0.3s"
		/>
	</q-toolbar>
	<q-separator class="jelly-gradient q-mb-md" />

	<q-slide-transition>
		<q-card flat v-show="expanded || forceExpand">
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
			required: false,
		},
		forceExpand: {
			type: Boolean,
			required: false,
			default: false,
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
