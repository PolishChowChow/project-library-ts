function createElementWithAttributes(tagName: string,textContent?: string, ...classes: string[]){
    const element = document.createElement(tagName);
    if(textContent !== "" && textContent !== undefined){
        element.textContent = textContent
    }
    console.log(classes);
    
    classes.forEach(classToAppend => {
        element.classList.add(classToAppend)
    })
    return element;
}
export default createElementWithAttributes