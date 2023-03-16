<template>
	<q-layout view="lHh Lpr lFf">
		<q-header class="jelly-gradient">
			<q-toolbar class="q-electron-drag">
				<!-- <q-btn
					flat
					dense
					round
					icon="fa-regular fa-bars"
					aria-label="Menu"
					@click="toggleLeftDrawer"
				/> -->

				<q-toolbar-title> DeFiChain Voting Helper </q-toolbar-title>

				<div>
					Version {{ basics.appVersion }}
					<q-btn
						@click="
							openURL('https://github.com/DerFuchs/defichain-voting-helper')
						"
						unelevated
						dense
						size="xs"
						color="accent"
						icon="fa-brands fa-github"
						label="view on GitHub"
					/>
				</div>
			</q-toolbar>
		</q-header>

		<!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
			<q-list>
				<q-item-label header> Essential Links </q-item-label>

				<EssentialLink
					v-for="link in essentialLinks"
					:key="link.title"
					v-bind="link"
				/>
			</q-list>
		</q-drawer> -->

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { openURL } from "quasar";

import { useBasicsStore } from "stores/basics";

const linksList = [
	{
		title: "Docs",
		caption: "quasar.dev",
		icon: "school",
		link: "https://quasar.dev",
	},
];

export default defineComponent({
	name: "MainLayout",

	components: {
		// EssentialLink,
	},

	setup() {
		const basics = useBasicsStore();
		const leftDrawerOpen = ref(false);

		return {
			basics,
			essentialLinks: linksList,
			leftDrawerOpen,
			toggleLeftDrawer() {
				leftDrawerOpen.value = !leftDrawerOpen.value;
			},
			openURL,
		};
	},
});
</script>
