[![size](https://img.shields.io/bundlephobia/minzip/@sebastbake/h)](https://bundlephobia.com/result?p=@sebastbake/h@1.0.1)
[![downloads](https://img.shields.io/npm/dw/@sebastbake/h)](https://www.npmjs.com/package/@sebastbake/h)
[![npm](https://img.shields.io/npm/v/@sebastbake/h)](https://www.npmjs.com/package/@sebastbake/h)
[![GitHub](https://img.shields.io/github/license/sebastbake/h)](https://github.com/SebastBake/h)

# h

An alternative implementation of the excellent [hyperscript](https://github.com/hyperhype/hyperscript) library. Makes use of [typescript 4.1
template literal types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#template-literal-types) to infer element types.

- [x] Supports SVG elements.

```ts
const element = h("div#someId", { onclick: handleClick }, [
  h("p.someClass", "Hello"),
  h("p.someClass", "World"),
]);

// Type inferred using typescript 4.1 beta template literals
type MyElement = typeof element; // HTMLDivElement
```
