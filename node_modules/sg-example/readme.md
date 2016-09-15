# sg-example
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![js-standard-style][standard-style-image]][standard-style-url]

[travis-image]: https://img.shields.io/travis/laat/sg-example.svg?style=flat
[travis-url]: https://travis-ci.org/laat/sg-example
[npm-image]: https://img.shields.io/npm/v/sg-example.svg?style=flat
[npm-url]: https://npmjs.org/package/sg-example
[standard-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-style-url]: https://github.com/feross/standard

A web component for displaying code examples in styleguides.

> Maintained by [Sigurd Fosseng](https://github.com/laat).

## Demo

> [Check it live](http://laat.github.io/sg-example).

## Usage

```html
<style>
    nav {
        border: 1px solid #ddd;
    }
    li {
        background-color: #fff;
        color: #f43;
    }
</style>
<sg-example>
    <nav>
        <ul>
            <li>example element 1</li>
            <li>example element 2</li>
        </ul>
    </nav>
</sg-example>
```

Gives this output:

![example](demo.png)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT © [Sigurd Fosseng](github.com/laat)
