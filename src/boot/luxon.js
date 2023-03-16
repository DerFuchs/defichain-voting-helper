import { boot } from "quasar/wrappers";
import { DateTime, Duration } from "luxon";

export default boot(({ app }) => {
  app.config.globalProperties.$dateTime = DateTime;
  app.provide("DateTime", DateTime);
  app.config.globalProperties.$dateTime = Duration;
  app.provide("Duration", Duration);
});

export { DateTime };
