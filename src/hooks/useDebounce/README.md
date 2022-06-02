# useDebounce

用来处理防抖值的 Hook。

## API

```javascript
const {debounced} = useDebounce(
  value: any,
  options?: Options
);
```

## Params

| 参数    | 说明           | 类型      | 默认值 |
| :------ | :------------- | :-------- | :----- |
| value   | 需要防抖的值   | `any`     | -      |
| options | 配置防抖的行为 | `Options` | -      |

## Options

| 参数     | 说明                     | 类型      | 默认值  |
| :------- | :----------------------- | :-------- | :------ |
| wait     | 等待时间，单位为毫秒     | `number`  | `1000`  |
| leading  | 是否在延迟开始前调用函数 | `boolean` | `false` |
| trailing | 是否在延迟开始后调用函数 | `boolean` | `false` |
| maxWait  | 最大等待时间，单位为毫秒 | `number`  | -       |
