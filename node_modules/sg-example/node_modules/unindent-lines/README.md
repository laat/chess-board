# unindent-lines
[![Build Status](https://travis-ci.org/laat/unindent-lines.svg?branch=master)](https://travis-ci.org/laat/unindent-lines)

> Map lines through unindent-lines


## Install

```
$ npm install --save unindent-lines
```

## Usage

```javascript
import unindentLines from 'unindent-lines'

const lines = '\ta\n\t\tb'
lines.split('\n').map(unindentLines()).join('\n')
//=> 'a\n\tb'
```


## License

MIT © [Sigurd Fosseng](https://github.com/laat)
