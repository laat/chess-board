# sg-example

[![npm][npm-image]][npm-url]
[![js-standard-style][standard-style-image]][standard-style-url]

[npm-image]: https://img.shields.io/npm/v/sg-example.svg?style=flat
[npm-url]: https://npmjs.org/package/sg-example
[standard-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-style-url]: https://github.com/feross/standard

A web component for displaying code examples in styleguides.

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

![example](demo/demo.png)
