import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useQuasar } from "quasar";
import { encode } from "base-64";
import { JsonRpcClient } from "@defichain/jellyfish-api-jsonrpc";

export const useNodeStore = defineStore("node", () => {
  // basic variables
  const $q = useQuasar();
  const rpcauth = ref("");
  const rpchost = ref("127.0.0.1");
  const rpcport = ref("8554");
  const credentialsLoadedFromLocalStorage = ref(false);

  function init() {
    rpcauth.value = $q.localStorage.getItem("rpcauth") || "";
    rpcport.value = $q.localStorage.getItem("rpcport") || "8554";
    if (rpcauth.value && rpcport.value) {
      credentialsLoadedFromLocalStorage.value = true;
    }
  }
  init();

  // runtime variables & computed props
  const requestUrl = computed(() => `http://${rpchost.value}:${rpcport.value}`);
  const rpcClientOptions = computed(() => {
    return {
      headers: {
        Authorization: "Basic " + encode(rpcauth.value),
      },
    };
  });

  const client = computed(() => {
    if (!hasCredentials.value) return null;
    return new JsonRpcClient(requestUrl.value, rpcClientOptions.value);
  });

  const hasCredentials = computed(() => {
    if (rpcauth.value.length > 0 && rpcport.value.length > 0) {
      return true;
    }
    return false;
  });

  function setRpcAuth(value, saveToLocalStorage = false) {
    rpcauth.value = value;
    if (saveToLocalStorage) {
      $q.localStorage.set("rpcauth", value);
    } else {
      $q.localStorage.set("rpcauth", "");
    }
  }

  function setRpcPort(value, saveToLocalStorage = false) {
    rpcport.value = value;
    if (saveToLocalStorage) {
      $q.localStorage.set("rpcport", value);
    } else {
      $q.localStorage.set("rpcport", "");
    }
  }

  return {
    rpcauth,
    rpcport,
    client,
    hasCredentials,
    credentialsLoadedFromLocalStorage,
    setRpcAuth,
    setRpcPort,
  };
});
