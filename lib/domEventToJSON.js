function traverse(eventData, seenObjects, currentDepth, maxDepth) {
    if (currentDepth >= maxDepth) return '[object Object]';

    const json = {};

    for (let key in eventData) {
        const value = eventData[key];

        switch (Object.prototype.toString.call(value)) {
            case '[object String]':
            case '[object Number]':
            case '[object Boolean]':
                json[key] = value;
                break;

            case '[object Null]':
                json[key] = null;
                break;

            case '[object Function]':
                json[key] = '[Function: ' + (value.name || 'anonymous') + ']';
                break;

            case '[object Object]':
            case '[object Array]':
            case '[object HTMLCollection]':
            case '[object HTMLDocument]':
            case '[object HTMLBodyElement]':
            case '[object HTMLInputElement]':
            case '[object HTMLDivElement]':
            case '[object NamedNodeMap]':
            case '[object NodeList]':
            case '[object DOMTokenList]':
            case '[object DOMStringMap]':
            case '[object CSSStyleDeclaration]':
            case '[object ValidityState]':
            case '[object Arguments]':
                if (seenObjects.indexOf(value) >= 0) {
                    json[key] = '[object Circular]';
                } else {
                    seenObjects.push(value);
                    json[key] = traverse(
                        value,
                        seenObjects,
                        currentDepth + 1,
                        maxDepth
                    );
                }
                break;
            case '[object Symbol]':
                json[key] = '[object Symbol]';
                break;
            default:
                json[key] = '[unhandled typeof]';
        }
    }

    return json;
}

export const parse = (eventData, depth) => {
    const maxDepth = depth || 4;
    const seenObjects = [eventData]; // start with itself

    return traverse(eventData, seenObjects, 0, maxDepth);
};
