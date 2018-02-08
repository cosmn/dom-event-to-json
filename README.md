For those cases where developer tools is not available

```Javascript
import domEventToJSON from 'dom-event-to-json'

element.addEventListener('click', (event) => {
    console.log(domEventToJSON(event))
})
```
