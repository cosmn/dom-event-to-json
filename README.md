For those cases where developer tools is not available

```Javascript
import domEventToJSON from 'dom-event-to-json'

element.addEventListener('click', (event) => {
    fetch('/debug', {
        method: 'POST',
        body: JSON.stringify( domEventToJSON(event) ),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
    })
})
```
