import { JSDOM } from 'jsdom';

import { ReachElement, ReachElementType } from './ReachElement';
import { DataElement } from './DataElement';

export class HTMLParser {
  dom: JSDOM
  doc: Document
  elms: NodeListOf<Element>
  reachElms: ReachElement[] = []
  dataElms: DataElement[] = []
  constructor(str: string) {
    this.dom = new JSDOM(str)
    this.doc = this.dom.window.document
    this.elms = this.doc.querySelectorAll('*')
    for (let i = 0; i < this.elms.length; i++) {
      let elm = this.elms[i] as HTMLElement
      let [attrs, isReachElement] = ReachElement.isReachElement(elm)
      if (!isReachElement) {
        continue
      }
      let reachElm = new ReachElement(elm, attrs)
      this.reachElms.push(reachElm)
      for (const [k, v] of Object.entries(ReachElementType)) {
        switch (v) {
          case ReachElementType.DATA: {
            let dataElm = new DataElement(reachElm)
            this.dataElms.push(dataElm)
          }
        }
      }
    }
  }
}


export function tmpl(str: string): string {
  let parser = new HTMLParser(str)
  return str
}