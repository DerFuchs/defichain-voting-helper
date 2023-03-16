import { ref } from "vue";
import { defineStore } from "pinia";
import { useNodeStore } from "stores/node";

export const useChainStore = defineStore("chain", () => {
  const node = useNodeStore();
  const fetching = ref(false);

  const blockHeight = ref(0);

  async function fetchBlockHeight() {
    if (!node.hasCredentials) return 0;

    fetching.value = true;
    let result = await node.client.blockchain.getBlockCount();
    blockHeight.value = result;
    fetching.value = false;
  }

  fetchBlockHeight();
  setInterval(fetchBlockHeight, 10 * 1000);

  return {
    fetching,
    blockHeight,
    fetchBlockHeight,
  };
});
