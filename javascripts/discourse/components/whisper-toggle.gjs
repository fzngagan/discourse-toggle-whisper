import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import DButton from "discourse/components/d-button";
import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";

export default class PostMenuFoldingButton extends Component {
  static hidden() {
    return true;
  }

  static shouldRender(args) {
    if (args.post.post_number === 1) {
      return false;
    }
    return args.state.currentUser?.whisperer;
  }

  @service appEvents;

  get isWhisper() {
    return this.args.post.post_type === 4;
  }

  get title() {
    return themePrefix(
      this.isWhisper
        ? "toggle_button_title.regular"
        : "toggle_button_title.whisper"
    );
  }

  get icon() {
    return this.isWhisper ? "far-eye" : "far-eye-slash";
  }

  @action
  toggleWhisper() {
    const model = this.args.post;
    let newType = model.post_type === 1 ? 4 : 1;
    ajax(`/posts/${model.id}/post_type`, {
      type: "PUT",
      data: {
        post_type: newType,
      },
    }).catch(popupAjaxError);
  }

  <template>
    <DButton
      class="toggle-whisper-btn"
      ...attributes
      @action={{this.toggleWhisper}}
      @icon={{this.icon}}
      @title={{this.title}}
    />
  </template>
}
