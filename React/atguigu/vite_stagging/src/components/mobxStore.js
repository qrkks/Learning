import { action, makeObservable, observable } from "mobx";

class CountStore {
    count = 0
    constructor() {
        makeObservable(this, {
            count: observable,
            increment: action
        })
    }
    increment() {
        this.count += 1
    }
}
const countStore = new CountStore()
export default countStore