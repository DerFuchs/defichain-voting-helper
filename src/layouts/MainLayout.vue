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

		<q-page-container :class="{ 'bg-grey-3': !basics.darkMode }">
			<!-- error dialog -->
			<q-dialog v-model="showError">
				<q-card flat color="primary">
					<q-card-section class="row items-center q-py-sm">
						<div class="text-body1">{{ basics.error.headline }}</div>
						<q-space />
						<q-btn
							icon="fa-regular fa-x"
							size="sm"
							flat
							round
							dense
							@click="basics.error = null"
						/>
					</q-card-section>
					<q-separator class="jelly-gradient" />
					<q-card-section horizontal>
						<q-card-section>
							<q-icon
								name="fa-solid fa-unlock-keyhole"
								size="xl"
								class="jelly-gradient-text"
							></q-icon>
						</q-card-section>
						<q-card-section>
							<div v-html="basics.error.text"></div>
						</q-card-section>
					</q-card-section>
					<q-card-action>
						<q-btn
							class="full-width"
							unelevated
							color="primary"
							label="okay"
							@click="basics.error = null"
						/>
					</q-card-action>
				</q-card>
			</q-dialog>

			<!-- page content -->
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
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
		const showError = computed(() => basics.error != null);

		return {
			basics,
			essentialLinks: linksList,
			leftDrawerOpen,
			toggleLeftDrawer() {
				leftDrawerOpen.value = !leftDrawerOpen.value;
			},
			openURL,
			showError,
		};
	},
});
</script>
