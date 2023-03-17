import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useBasicsStore } from "stores/basics";
import { useNodeStore } from "stores/node";
import { useMasternodesStore } from "stores/masternodes";

export const useProposalsStore = defineStore("proposals", () => {
  // basic variables
  const basics = useBasicsStore();
  const node = useNodeStore();
  const masternodes = useMasternodesStore();

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

  async function vote(proposalId, decision) {
    let txIds = [];
    await masternodes.active.forEach(async (masternode) => {
      try {
        txIds.push = await node.client.governance.voteGov({
          proposalId: proposalId,
          masternodeId: masternode.id,
          decision: decision,
        });
      } catch (error) {
        if (
          error.payload.code == -25 &&
          error.payload.message.includes("missing key")
        ) {
          basics.error = {
            headline: "Your Wallet Is Locked",
            text: "Please unlock your wallet first.<br /> Then try again.",
          };
          console.error(basics.error);
        }
      }
      //console.log(txIds);
    });
    return txIds;
  }

  return {
    fetch,
    all: proposals,
    running,
    regular,
    emergency,

    vote,
  };
});
