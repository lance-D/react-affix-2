# react-affix
react版本的affix固钉,将元素固定在特定区域，一般用于导航栏固钉

## API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| offsetTop | 距离窗口顶部指定偏移量后触发 | number | '0' | '' |
| offsetBottom | 距离窗口底部指定偏移量后触发 | number | null | null |
| onFixed | 触发固定后执行的回调函数 | function | null | null |
| outFixed | 固定消失后执行的回调函数 | function | null | null |


>当且仅当offsetTop未设置，offsetBottom已设置，才会距离底部指定距离触发
