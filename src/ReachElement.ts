export enum ReachElementType {
  DATA = '__data'
}

export class ReachElement {
  elm: HTMLElement
  reachAttrs: string[]
  constructor(elm: HTMLElement, reachAttrs: string[]) {
    this.elm = elm
    this.reachAttrs = reachAttrs
  }
  isTypeOf(str: ReachElementType): boolean {
    if (this.reachAttrs.includes(str)) {
      return true
    }
    return false
  }
  static isReachElement(elm: HTMLElement): [string[], boolean] {
    let validAttrs: ReachElementType[] = [ReachElementType.DATA]
    let foundAttrs: string[] = []
    for (let i = 0; i < validAttrs.length; i++) {
      let attr = validAttrs[i] as string
      if (elm.hasAttribute(attr)) {
        foundAttrs.push(attr)
      }
    } 
    if (foundAttrs.length == 0) {
      return [foundAttrs, false]
    }
    return [foundAttrs, true]
  }
}
