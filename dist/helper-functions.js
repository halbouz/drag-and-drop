//This decorator autobinds our class's element when we call functions
export function AutoBind(_, __, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
//This function checks if a string respects length constraints
export function validateString(input, [minLength, maxLength]) {
    return input.length >= minLength && input.length <= maxLength;
}
//# sourceMappingURL=helper-functions.js.map