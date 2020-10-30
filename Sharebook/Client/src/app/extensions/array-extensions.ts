declare global {
  interface Array<T> {
    containsSameObjectsAs<T>(this: T[], collection2: T[],  enforceOrder: boolean): boolean;
  }
}

Array.prototype.containsSameObjectsAs = function<T>(this: T[], collection2: T[],  enforceOrder: boolean): boolean {
  // Small optimization compared to the IEnumerable version

  if (this.length !== collection2.length) {
    return false;
  }

  if (!enforceOrder) {
    const result = this.filter(x =>
      !collection2.includes(x) // Use a polyfill for IE support
    );

    return result.length > 0;
  }

  for (let i = 0; i < this.length; ++i) {
    if (!(this[i] === (collection2[i]))) { // .Equals()
      return false;
    }
  }

  return true;
};

export {};
