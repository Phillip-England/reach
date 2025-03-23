
//==================================
// util
//==================================

// generate a random string contains only letters and numbers at a given length
function randomStr(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}


//==================================
// signal
//==================================

// instantiate a reactive value which can subscribe to changes
class Signal {
  private value: any;
  private listeners: Set<(value: any) => void>;
  dataType: string;

  constructor(value: any, dataType: string) {
    this.value = value;
    this.listeners = new Set();
    this.dataType = dataType;
  }

  get() {
    switch (this.dataType) {
      case 'bool':
        return Boolean(this.value);
      case 'int':
        return Number(this.value);
      case 'str':
        return String(this.value);
      case 'obj':
        return Object(this.value);
      default:
        return String(this.value);
    }
  }

  set(newValue: any): void {
    if (!this.checkType(newValue)) {
      console.warn(
        `Signal.set() received value of type '${typeof newValue}' but expected '${this.dataType}'. Value:`,
        newValue
      );
    }
    this.value = newValue;
    this.listeners.forEach((listener) => listener(newValue));
  }

  subscribe(listener: (value: any) => void): () => void {
    if (typeof listener !== 'function') {
      console.warn(
        `Signal.subscribe() expected a function but received:`,
        listener
      );
      return () => {};
    }

    const wrappedListener = (value: any) => {
      if (!this.checkType(value)) {
        console.warn(
          `Signal listener received value of type '${typeof value}' but expected '${this.dataType}'. Value:`,
          value
        );
      }
      listener(value);
    };

    this.listeners.add(wrappedListener);
    return () => this.listeners.delete(wrappedListener);
  }

  private checkType(value: any): boolean {
    switch (this.dataType) {
      case 'bool':
        return typeof value === 'boolean';
      case 'int':
        return typeof value === 'number' && Number.isInteger(value);
      case 'str':
        return typeof value === 'string';
      case 'obj':
        return typeof value === 'object' && value !== null;
      default:
        return true;
    }
  }
}


//==================================
// reach
//==================================

class Reach {
  signals: Record<string, Signal>
  constructor() {
    this.signals = {}

  }
}

//==================================
// reach component
//==================================



//==================================
// running
//==================================


const $ = new Reach()