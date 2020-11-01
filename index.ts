type ElementOf<E extends string> = E extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[E]
  : E extends `${infer El_NAME}.${infer _}`
  ? El_NAME extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[El_NAME]
  : Element
  : E extends `${infer El_NAME}#${infer _}`
  ? El_NAME extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[El_NAME]
  : Element
  : Element;

type Attributes<A extends string = string> = { [K in A]?: K extends `on${infer EVENT_NAME}`
  ? EVENT_NAME extends keyof HTMLElementEventMap
  ? ((ev: HTMLElementEventMap[EVENT_NAME]) => any) | undefined | null
  : string | null | undefined | number | boolean
  : string | null | undefined | number | boolean
}

type Children = Node | string | null | undefined | Children[]


/**
 * Constructs a HTMLElement
 */
function h<NAME extends string, ATTRS extends string>(elementName: NAME, attr: Attributes<ATTRS>, ...children: Children[]): ElementOf<NAME>
function h<NAME extends string>(elementName: NAME, ...children: Children[]): ElementOf<NAME>
function h<NAME extends string>(elementName: NAME): ElementOf<NAME>
function h<NAME extends string>(elementName: NAME, ...args: any[]): ElementOf<NAME> {
  const element = makeElement(elementName)

  for (const item of args) {
    if (typeof item === 'object'
      && !Array.isArray(item)
      && typeof item.isSameNode !== 'function') {
      addAttributesToElement(element, item)
    } else {
      addChildrenToElement(element, item)
    }
  }

  return element
}

/**
 * adds children to a html element
 * @param element 
 * @param children 
 */
function addChildrenToElement(element: Element, children: Children) {
  if (Array.isArray(children)) {
    for (const child of children) {
      addChildrenToElement(element, child)
    }
  } else if (typeof children === 'string') {
    const textNode = new Text(children)
    element.appendChild(textNode)
  } else if (children) {
    element.appendChild(children)
  }
}

/**
 * Adds attributes to a html element
 * @param element 
 * @param attr 
 */
function addAttributesToElement(element: Element, attr: Attributes) {
  for (const [key, value] of Object.entries(attr)) {
    if (typeof value === 'function') {
      // @ts-expect-error
      element[key] = value
    } else if (value !== undefined && value !== null) {
      element.setAttribute(key, String(value))
    }
  }
}

/**
 * Creates a element based on our fancy template and adds the ids and classes
 * @param template 
 */
function makeElement<NAME extends string>(template: NAME): ElementOf<NAME> {

  // tokenize the string
  const tokens = template.match(/[.#]?[0-9a-zA-Z-_]+/g) || []
  const elementName = tokens[0];
  let element: Element;
  try {
    element = document.createElement(elementName)
  } catch {
    try {
      element = document.createElementNS('http://www.w3.org/2000/svg', elementName)
    } catch (e) {
      throw e
    }
  }
  const idsAndClasses = tokens.slice(1)

  // Add ids and classes into the new element
  for (const idOrClassWithDotOrHash of idsAndClasses) {
    const idOrClass = idOrClassWithDotOrHash.slice(1)
    if (idOrClassWithDotOrHash[0] === '.') {
      element.classList.add(idOrClass)
    } else if (idOrClassWithDotOrHash[0] === '#') {
      element.id = idOrClass
    }
  }

  // @ts-expect-error
  return element
}


export default h
