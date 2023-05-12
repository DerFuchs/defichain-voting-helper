import { computed, inject, ref } from "vue";
import { defineStore } from "pinia";
import { useQuasar } from "quasar";

export const useBasicsStore = defineStore(
  "basics",
  () => {
    const appVersion = 3;
    const darkMode = computed(() => useQuasar().dark.isActive);
    const formatting = {
      currency: {
        dfi: { style: "currency", currency: "DFI" },
        dfiNoSymbol: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
      },
    };

    const Duration = inject("Duration");
    function timeLeft(hours) {
      if (!hours || typeof hours !== "number") {
        return "";
      }
      let duration = Duration.fromObject({
        days: 0,
        hours: hours,
        minutes: 0,
      })
        .normalize()
        .reconfigure({ locale: "en-US" })
        .shiftTo("days", "hours", "minutes");

      if (duration.days == 0) {
        duration = duration.shiftTo("hours", "minutes");
      }

      return duration.toHuman({ unitDisplay: "short" });
    }

    const error = ref(null);

    return {
      appVersion,
      darkMode,
      formatting,
      timeLeft,
      error,
    };
  }
  // {
  //   /**
  //    * Configures persistance
  //    * Docu: https://github.com/iendeavor/pinia-plugin-persistedstate-2
  //    */
  //   persistedState: {
  //     key: "defichain-vote-helper-proposals",
  //     includePaths: [user, secret, host, port],
  //   },
  // }
);
