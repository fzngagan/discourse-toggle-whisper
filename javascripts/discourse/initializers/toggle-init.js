import { withPluginApi } from "discourse/lib/plugin-api";
import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";

export default {
  name: "toggle-whispers",
  initialize() {
    withPluginApi("0.1", whisperInit);
  },
};

const whisperInit = (api) => {
  const currentUser = api.getCurrentUser();
  if (currentUser && currentUser.staff) {
    api.attachWidgetAction("post-menu", "toggleWhisper", function () {
      const model = this.attrs;
      let newType = model.post_type === 1 ? 4 : 1;
      ajax(`/posts/${model.id}/post_type`, {
        type: "PUT",
        data: {
          post_type: newType,
        },
      }).catch(popupAjaxError);
    });

    api.addPostMenuButton("toggleWhisper", () => {
      return {
        action: "toggleWhisper",
        icon: "file-alt",
        title: themePrefix("toggle_button_title"),
      };
    });
  }
};
