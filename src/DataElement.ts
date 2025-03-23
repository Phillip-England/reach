import type { ReachElement } from "./ReachElement"
import { TemplateVariable, VariableExtractor } from "./VariableExtractor"

export class DataElement {
  reachElm: ReachElement
  varExtractor: VariableExtractor
  dataAttr: string
  data: Record<string, any> = {}
  dataJSON: any
  html: string = ''
  constructor(reachElm: ReachElement) {
    this.reachElm = reachElm
    this.html = this.reachElm.elm.outerHTML
    this.varExtractor = VariableExtractor.fromStr(this.reachElm.elm.outerHTML)
    this.dataAttr = this.reachElm.elm.getAttribute('__data') as string
    let json = JSON.parse(this.dataAttr)
    this.data = json
    for (let i = 0; i < this.varExtractor.variables.length; i++) {
      let variable = this.varExtractor.variables[i] as TemplateVariable
      let stateValue = this.data[variable.inner]
      this.html = this.html.replace(variable.raw, stateValue)
    }
    console.log(this.html)
  }
  
}