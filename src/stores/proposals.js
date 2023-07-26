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

    node.client.governance.listGovProposals().then((result) => {
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

  const special = computed(() => {
    return running.value.filter((proposal) => {
      return proposal?.options?.includes("emergency");
    });
  });

  async function vote(proposalId, decision) {
    let txIds = [];
    await Promise.all(
      masternodes.active.map(async (masternode) => {
        try {
          let result = await node.client.governance.voteGov({
            proposalId: proposalId,
            masternodeId: masternode.id,
            decision: decision,
          });
          console.log(result);
          txIds.push(result);
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
          if (error.payload.code == -10) {
            basics.error = {
              headline: "Your Wallet Is Not Synced",
              text: "Please let your wallet sync first.<br /> Then try again.",
            };
            console.error(basics.error);
          }
        }
      })
    );
    return txIds;
  }

  async function getUserVotes(proposalId) {
    if (!node.hasCredentials) return;

    const result = await node.client.governance.listGovProposalVotes({
      proposalId: proposalId,
      masternode: "mine",
      aggregate: true,
    });

    if (result.length == 0) {
      return "undecided";
    }
    if (result[0].yes > 0) {
      return "yes";
    }
    if (result[0].no > 0) {
      return "no";
    }
    if (result[0].neutral > 0) {
      return "neutral";
    }

    return "undecided";
  }

  return {
    fetch,
    all: proposals,
    running,
    regular,
    special,

    vote,
    getUserVotes,
  };
});
