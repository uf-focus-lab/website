export function* traverseParents(el: HTMLElement) {
    while (true) {
        yield el;
        const { parentElement } = el;
        if (parentElement)
            el = parentElement;
        else break;
    }
}