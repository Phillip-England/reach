export class TemplateVariable {
  raw: string;
  inner: string;

  constructor(raw: string) {
    this.raw = raw;
    this.inner = raw.slice(2, -2).trim();
  }
}

export class VariableExtractor {
  variables: TemplateVariable[];
  private constructor(variables: TemplateVariable[]) {
    this.variables = variables;
  }
  static fromStr(str: string): VariableExtractor {
    const matches = str.match(/{{\s*[^}]+\s*}}/g) || [];
    const variables = matches.map((m) => new TemplateVariable(m));
    return new VariableExtractor(variables);
  }
}