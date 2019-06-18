import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Tag } from 'antd'
const CheckableTag = Tag.CheckableTag

/**
 * 封装---选择分类、标签的组件
 *
 * @class SelectCates
 * @extends {Component}
 */
@connect(state => state.article)
class SelectCates extends Component {
    constructor(props) {
        super(props)
        const { type, showNum } = this.props
        let selectList
        // 新增状态
        if (!this.props.isEdit) {
            this.CommonlyList = this.getCommonlyList(this.props[`${type}List`], showNum)
            // 默认选中第一个  selectList = this.props.list
            selectList = this.CommonlyList[0] ? [this.CommonlyList[0]] : []
        }
        this.state = { selectList }
    }
    static propTypes = {
        type: PropTypes.string.isRequired,
        showNum: PropTypes.number,
        list: PropTypes.array,
        isEdit: PropTypes.bool
    }
    static defaultProps = {
        type: 'tags',
        showNum: 10
    }
    /**
     * 获取常用的分类、标签列表
     * 
     * @param {array} list - 列表数据
     * @param {number} num - 获取数量 
     * */
    getCommonlyList = (list, num = 10) => {
        const sortList = list.sort((a, b) => {
            return b.count - a.count
        }).map(d => d.name)
        return sortList.slice(0, num)
    }
    // 行点击选中事件
    handleSelect = (value, checked) => {
        const { selectList } = this.state
        const nextSelectList = checked ? [...selectList, value] : selectList.filter(t => t !== value)
        this.setState({
            selectList: nextSelectList
        })
    }
    render() {
        const { selectList } = this.state
        const { type, isEdit } = this.props
        return (
            <div className="blog-formItem">
                <span className="label">{type}: </span>
                {
                    isEdit ?
                        this.props.list.map((item, i) => (
                            <CheckableTag
                                key={item}
                                checked={selectList.includes(item)}
                                onChange={checked => this.handleSelect(item, checked)}
                            >
                                {item}
                            </CheckableTag>
                        ))
                        :
                        this.CommonlyList.map((item, i) => (
                            <CheckableTag
                                key={item}
                                checked={selectList.includes(item)}
                                onChange={checked => this.handleSelect(item, checked)}>
                            >
                                {item}
                            </CheckableTag>
                        ))
                }
            </div>
        )
    }
}

export default SelectCates