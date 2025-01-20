import { withPluginApi } from "discourse/lib/plugin-api";
import WhisperToggle from "../components/whisper-toggle";

export default {
  name: "toggle-whispers",
  initialize() {
    withPluginApi("0.11.0", (api) => {
      api.registerValueTransformer(
        "post-menu-buttons",
        ({ value: dag, context: { lastHiddenButtonKey } }) => {
          dag.add("post-folding", WhisperToggle, {
            before: lastHiddenButtonKey,
          });
        }
      );
    });
  },
};
