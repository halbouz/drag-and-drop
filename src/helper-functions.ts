//This decorator autobinds our class's element when we call functions
export function AutoBind(_: any, __: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

//This function checks if a string respects length constraints
export function validateString(
  input: string,
  [minLength, maxLength]: [number, number]
) {
  return input.length >= minLength && input.length <= maxLength;
}
