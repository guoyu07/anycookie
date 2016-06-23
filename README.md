# anycookie

A light version of evercookie with no server side required. 8xx bytes minimized and 5xx bytes gzipped

- localStore
- sessionStorage
- cookie

## Usage

#### Development

```html
<script src="https://rawgit.com/yieme/anycookie/master/anycookie.js"></script>
<script>
  AC.set('key', 'value')
  console.log(AC.get('key')) // "value"
  console.log(AC.get('badkey')) // null
</script>
```

#### Production

```html
<script src="https://cdn.rawgit.com/yieme/anycookie/1.0.5/anycookie.min.js"></script>
```

## Namespace

Change `AC` in the last line to your namespace

```js
  // ...
})(window, document, 'cookie', 'length', 'AC')
```

Production use: `https://rawgit.com/yieme/anycookie/master/anycookie.js`

## License

MIT
