# wareki

## Installation

```sh
$ npm install wareki
```

## Usage

```js
import wareki from "wareki";

wareki("1989-01-07");
// -> 昭和64
wareki("1989-01-08");
// -> 平成元
wareki("2018-08-01", { unit: true });
// -> 平成30年
wareki("2019-05-01");
// -> 令和元
```
