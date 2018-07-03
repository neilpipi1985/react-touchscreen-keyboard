# react-touchscreen-keyboard

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/react-touchscreen-keyboard.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-touchscreen-keyboard
[download-image]: https://img.shields.io/npm/dm/react-touchscreen-keyboard.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-touchscreen-keyboard

![image](https://raw.githubusercontent.com/neilpipi1985/react-touchscreen-keyboard/blob/master/demo.gif)

## Quick start

**Installing via npm**

```
$ npm install --save-dev react-touchscreen-keyboard
```

### Example

```js
import React, { Component } from 'react';
import Keyboard from 'react-touchscreen-keyboard';

class MyKeyboard extends Component {
  onReturnValue = (value = '') => {
    console.log(value);
  }

  render() {
    return (<Keyboard showKeyboard={true} type="text" value="" onReturnValue={this.onReturnValue} />);
  }
}

export default MyKeyboard;
```

### Props

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 100px;">name</th>
      <th style="width: 50px;">type</th>
      <th style="width: 150px;">default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>style</td>
      <td>object</td>
      <td>{}</td>
    </tr>
    <tr>
      <td>showKeyboard</td>
      <td>bool</td>
      <td>false</td>
    </tr>
    <tr>
      <td>enableDefaultButton</td>
      <td>bool</td>
      <td>true</td>
    </tr>
    <tr>
      <td>leftButtons</td>
      <td>array</td>
      <td>[]</td>
    </tr>
    <tr>
      <td>rightButtons</td>
      <td>array</td>
      <td>[]</td>
    </tr>
    <tr>
      <td>type</td>
      <td>string: 'text', 'password', 'email'</td>
      <td>'text'</td>
    </tr>
    <tr>
      <td>value</td>
      <td>string</td>
      <td>''</td>
    </tr>
    <tr>
      <td>isFirstLetterUppercase</td>
      <td>bool</td>
      <td>false</td>
    </tr>
    <tr>
      <td>layouts</td>
      <td>array</td>
      <td>[LatinLayout]</td>
    </tr>
    <tr>
      <td>onChangeValue</td>
      <td>func</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>onReturnValue</td>
      <td>func</td>
      <td>undefined</td>
    </tr>
  </tbody>
  </table>

See the [examples](https://github.com/neilpipi1985/react-touchscreen-keyboard/blob/master/example/render/app.js) for a more complete sample.


### Running Local Example

```   
$ git clone https://github.com/neilpipi1985/react-touchscreen-keyboard
$ cd ./react-touchscreen-keyboard
$ npm install
$ npm run test
```
