import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useNodeStore } from "stores/node";

export const useMasternodesStore = defineStore("masternodes", () => {
  const node = useNodeStore();
  const fetching = ref(false);

  const active = ref([]);

  async function fetch() {
    if (!node.hasCredentials) return;

    fetching.value = true;
    const mnList = await node.client.masternode.listMasternodes({
      including_start: true,
      limit: 9999999,
    });
    let tmp = Object.entries(mnList).filter((entry) => {
      return entry[1].ownerIsMine && entry[1].state == "ENABLED";
    });
    tmp.forEach((element, index) => {
      tmp[index] = { ...element[1], ...{ id: element[0] } };
    });
    active.value = tmp;
    fetching.value = false;
  }

  return {
    fetching,
    fetch,
    active,
  };
});
