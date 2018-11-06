<div align="center">
  <h1>
    <br/>
    <br/>
    🗺
    <br />
    use-t
  </h1>
  <sup>Translations for React.</sup>
  <br />
  <br />
  <br />
  <br />
</div>


<h2 align="center">Installation</h2>
<pre>npm i <a href="https://www.npmjs.com/package/use-t">use-t</a></pre>


<br />
<br />


<h2 align="center">Reference</h2>
<pre>
import {<a href="./docs/createTranslations.md">createTranslations</a>} from <a href="https://www.npmjs.com/package/use-t">'use-t'</a>;

const {<a href="./docs/Provider.md">Provider</a>, <a href="./docs/useT.md">useT</a>, <a href="./docs/withT.md">withT</a>,
    <a href="./docs/Trans.md">Trans</a>, <a href="./docs/Consumer.md">Consumer</a>, <a href="./docs/context.md">context</a>} = createTranslations();
</pre>

- [`<Provider>`](./docs/Provider.md)
- [`useT`](./docs/useT.md)
- [`withT`](./docs/withT.md)
- [`<Trans>`](./docs/Trans.md)
- [`<Consumer>`](./docs/Consumer.md)
- [`context`](./docs/context.md)


<br />
<br />


<h2 align="center">Example</h2>

```jsx
import {createTranslations} from 'use-t';

const {Provider, useT} = createTranslations();

const Hello = (props) => {
  const [t] = useT();
  return (
    <div>
      {t('Hello')}, {props.name}!
    </div>
  );
};

<Provider map={{en: {main: {Hello: 'Hello'}}}}>
  <Hello />
</Provider>
```


<br />
<br />


<h2 align="center">License</h2>

<p align="center">
  <a href="./LICENSE">Unlicense</a> &mdash; public domain.
</p>
