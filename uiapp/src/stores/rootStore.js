import Session from "./session";
import UiState from "./uistate";

export default class RootStore {
  constructor() {
      this.uiState = new UiState(this);
      this.session = new Session(this);
  }
}