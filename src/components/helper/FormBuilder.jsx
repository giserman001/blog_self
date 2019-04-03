import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Col, Form, Icon, Row, Tooltip } from 'antd'

const FormItem = Form.Item

/**
 * 、JS中的||符号：

运算方法：

    只要“||”前面为false,不管“||”后面是true还是false，都返回“||”后面的值。

    只要“||”前面为true,不管“||”后面是true还是false，都返回“||”前面的值。

总结：真前假后

2、JS中的&&符号：

运算方法：

    只要“&&”前面是false，无论“&&”后面是true还是false，结果都将返“&&”前面的值;

    只要“&&”前面是true，无论“&&”后面是true还是false，结果都将返“&&”后面的值;

总结：假前真后

弄懂了以上说的还应该知道：

    js的6个蛋蛋：在js逻辑运算中，0、”“、null、false、undefined、NaN都会判为false，其他都为true。
 */


/**
 * 获取 elements 的最后一个 index （用于决定 this.props.children 的渲染）
 * @param {Boolean} dynamic - 是否为动态表单
 * @param {Array} elements
 */
function getLastIndex(dynamic = false, elements) {
  if (!dynamic) return elements.length - 1
  const els = elements.filter(v => !!v)
  return els.length - 1
}

const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

/**
 * @func getLastFormItemLayout - 根据 formItemProps.formItemLayout 计算最后一项 Item wrapperCol
 * @param {Object} formItemProps
 * @returns wrapperCol
 */
function getLastFormItemLayout({ labelCol }) {
  let wrapperCol = { xs: {}, sm: {} }
  for (let key in labelCol) {
    if (labelCol[key]['span'] === 24) {
      wrapperCol[key]['offset'] = 0
      wrapperCol[key]['span'] = 24
    } else {
      wrapperCol[key]['offset'] = labelCol[key]['span']
      wrapperCol[key]['span'] = 24 - labelCol[key]['span']
    }
  }
  return wrapperCol
}

/**
 * @func pickProps - 遍历剩余相关部件（<Form.Item />）的 props，（我们不应把 element 的 props 都传入每个部件，只需要传对应需要的 props!）
 * @param {Object} source - 每个 element 对象
 * @param {Array} props 剩余 <Form.Item /> props属性
 */
function pickProps(source, props) {
  let target = {}
  props.forEach(prop => {
    if (prop in source) target[prop] = source[prop]
  })
  return target
}

/**
 * 封装处理 antd 的表单，减少代码量。
 * @example see src/examples/FormBuilder/baseForm
 * @example see src/examples/FormBuilder/dynamicForm 动态表单
 *
 * @class FormBuilder
 * @extends {Component}
 */
class FormBuilder extends Component {
  static propTypes = { //注意：这里的propTypes的第一个字母是小写
    meta: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    dynamic: PropTypes.bool // 是否为动态表单
  }

  static defaultProps = {
    disabled: false,
    one: false
  }
  getMeta() {
    const { meta } = this.props
    return meta.elements ? meta : { elements: [meta] }
  }
  renderLayout = elements => {
    // 表单布局设计
    const columns = this.props.meta.columns || 1
    if (columns === 1) return elements // 默认都是一行显示一个
    const gutter = this.props.meta.gutter || 0
    const rows = []
    const colspan = 24 / columns
    for (let i = 0; i < elements.length; i += columns) {
      const cols = []
      for (let j = 0; j < columns;) {
        cols.push(
          <Col key={j} span={colspan.toString()}>
            {elements[i + j]}
          </Col>
        )
      }
      rows.push(
        <Row key={i} gutter={gutter}>
          {cols}
        </Row>
      )
    }
    return rows
  }
  renderElement = (element, index) => {
    const meta = this.getMeta()
    if (!element) return null
    //handle form item props
    const label = element.tooltip ? (
      <span>
        {element.label}
        <Tooltip title={element.tooltip}>
          {' '}
          <Icon type="question-circle-o" />
        </Tooltip>
      </span>
    ) : (
        element.label
      )
    // 处理<Form.Item />组件props
    const formItemProps = {
      key: element.id || element.key,
      colon: meta.colon,
      ...(meta.formItemLayout || (element.label ? defaultFormItemLayout : null)),
      label,
      ...pickProps(element, ['help', 'extra', 'labelCol', 'wrapperCol', 'colon', 'hasFeedback', 'validateStatus']),
      ...element.formItemProps // 自定义的属性
    }
    // 这个不太明白
    if (element.render) {
      return element.render.call(this, {
        formItemProps,
        element,
        disabled: this.props.disabled
      })
    }
    // 处理验证规则
    let rules = element.rules || []
    if (element.required) {
      rules = [
        ...rules,
        {
          required: true,
          message: `${element.label || element.id || element.key} is required.`
        }
      ]
    }
    // 详见 https://ant.design/components/form-cn/#components-form-demo-normal-login
    // getFieldDecorator(id, options) 参数
    const fieldProps = {
      ...pickProps(element, [
        'getValueFromEvent',
        'initialValue',
        'normalize',
        'preserve',
        'trigger',
        'valuePropName',
        'validateTrigger',
        'validateFirst'
      ]),
      rules,
      ...element.fieldProps
    }
    // 处理表单props
    const wp = element.widgetProps || {}
    const widgetProps = {
      ...pickProps(element, ['placeholder', 'type', 'className', 'class']),
      ...wp,
      disabled: element.disabled || wp.disabled || this.props.disabled
    }
    const { getFieldDecorator } = this.props.form
    if (meta.elements && this.props.children && getLastIndex(this.props.dynamic, meta.elements) === index) {
      const wrapperCol = getLastFormItemLayout(formItemProps)
      return (
        <Fragment key={element.id || element.key}>
          <FormItem {...formItemProps}>
            {
              getFieldDecorator(element.id || element.key, fieldProps)(
                <element.widget {...widgetProps}>{element.children || null}</element.widget>
              )
            }
          </FormItem>
          <FormItem wrapperCol={wrapperCol} key={index + 1}>
            {this.props.children}
          </FormItem>
        </Fragment>
      )
    } else {
      return (
        <FormItem {...formItemProps}>
          {
            getFieldDecorator(element.id || element.key, fieldProps)(
              <element.widget {...widgetProps}>{element.children || null}</element.widget>
            )
          }
        </FormItem>
      )
    }
  }
  render() {
    return (
      this.renderLayout(this.getMeta().elements.map(this.renderElement))
    )
  }
}
export default FormBuilder