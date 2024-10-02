import { makeAutoObservable } from "mobx";

class CountStore {
    count = 0
    constructor() {
        makeAutoObservable(this, {
        })
    }
    increment() {
        this.count += 1
    }
}
const countStore = new CountStore()
export default countStore