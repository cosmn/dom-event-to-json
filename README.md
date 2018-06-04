For those cases where developer tools are not available,<br>
and debugging events turns difficult. E.g. Chrome on iOS without a Mac

#### Usage

`parse(object:Object, [depth:Int]):Object`

#### Examples

```Javascript
import { parse } from 'dom-event-to-json'

element.addEventListener('click', (event) => {
    fetch('/debug', {
        method: 'POST',
        body: JSON.stringify( parse(event) ),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
    })
})
```

```HTML
<script src="https://cdn.rawgit.com/cosmn/dom-event-to-json/3bedcc44/dist/domEventToJSON.js"></script>
<script>
element.addEventListener('click', function(event){
    console.log( domEventToJSON.parse(event) )
})
</script>
```
