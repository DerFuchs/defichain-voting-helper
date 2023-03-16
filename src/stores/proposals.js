import { computed, ref } from "vue";
import { defineStore } from "pinia";
//import { encode } from "base-64";
//import { JsonRpcClient } from "@defichain/jellyfish-api-jsonrpc";
import { useNodeStore } from "stores/node";

export const useProposalsStore = defineStore("proposals", () => {
  // basic variables
  const node = useNodeStore();

  // runtime variables & computed props
  const proposals = ref([]);

  /**
   * Fetches proposals from the configured (local) DeFiChain node
   */
  function fetch() {
    if (!node.hasCredentials) return;

    const client = node.client;
    //const client = new JsonRpcClient(requestUrl.value, rpcClientOptions);
    client.governance.listGovProposals().then((result) => {
      proposals.value = result;
    });
  }

  const running = computed(() => {
    return proposals.value.filter((proposal) => proposal.status === "Voting");
  });

  const regular = computed(() => {
    return running.value.filter(
      (proposal) => !proposal?.options?.includes("emergency")
    );
  });

  const emergency = computed(() => {
    return running.value.filter((proposal) => {
      // if (proposal?.options?.includes("emergency")) {)
      // console.log(proposal);
      return proposal?.options?.includes("emergency");
    });
  });

  function vote(proposalId, decision) {}

  return {
    fetch,
    all: proposals,
    running,
    regular,
    emergency,

    vote,
  };
});
