---
nav:
    title: '基础'
    path: /base
group:
    path: /基础/index
    title: '基础'
---


## css基础复习

### css的三大特性

#### 1、继承性

css中的继承性，与其他语言的继承性相比是有区别的，

1. 部分属性继承。
2. 多级子代继承。

	
	- 可继承属性：字体，文本等属性，颜色、font-开头、text-开头、line-开头的、white-space。
	- 不可继承属性：边框、外边距、内边距、背景、定位、高度、浮动

	`注意：不容易找出其属性的来源，因此在开发时需要找父级元素，从而找出样式来源，并得到解决方案`

#### 2、优先级

css中的优先级，在面对两个样式作用于同一元素，同一个属性，不同值时，浏览器的选择标准是基于css权重做判断的，浏览器按照css的规则得出css的权重从而得出样式的优先级，优先展示权重高的样式。

##### css权重计算规则

###### 权重参考表

<table>
	<thead>
		  <tr>
		    <th>元素</th>
		    <th>贡献值</th>
		  </tr>
	</thead>
  <tr>
    <td>继承、*</td>
    <td>0，0，0，0</td>
  </tr>
  <tr>
    <td>标签</td>
    <td>0，0，0，1</td>
  </tr>
  <tr>
    <td>类、伪类</td>
    <td>0，0，1，0</td>
  </tr>
 <tr>
    <td>ID</td>
    <td>0，1，0，0</td>
  </tr>
 <tr>
    <td>行内样式</td>
    <td>1，0，0，0</td>
  </tr>
 <tr>
    <td>!important</td>
    <td>无穷大</td>
  </tr>
 <tr>
    <td>max-height、max-width覆盖width、height</td>
    <td>大于无穷大</td>
  </tr>
 <tr>
    <td>min-height、max-width</td>
    <td>大于max-height、max-width</td>
  </tr>
</table>

###### 计算规则

1、按照贡献值累加，同位相加不会超过10就进位。
2、权重不会被子元素继承，可以理解为继承的只能是属性，权重是人为制定的规则，如1所示。
3、min-height/min-width > max-height/max-width > !important > 行内样式 > ID选择器 > 类选择器、属性选择器、伪元素和伪类选择器 > 元素选择器 > 通用选择器

#### 3、特殊性/层叠性

可覆盖，当两个作用于同一元素的样式权重一样大时，按照css加载顺序进行渲染，原因与html渲染机制相关。