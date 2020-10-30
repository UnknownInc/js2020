import { makeAutoObservable, observable, } from "mobx"

export default class UiState {
    language = "en_US"
    pendingRequestCount = 0

    // .struct makes sure observer won't be signaled unless the
    // dimensions object changed in a deepEqual manner.
    windowDimensions = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    constructor(root) {
        this.root=root;
        makeAutoObservable(this, { windowDimensions: observable.struct })
        window.onresize = (e) => {
          const {innerHeight, innerWidth} = e.target;
          this.windowDimensions={width:innerWidth,height:innerHeight};
        }
    }

    get appIsInSync() {
        return this.pendingRequestCount === 0
    }
}