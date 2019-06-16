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

class SelectCates extends Component {
    constructor(props) {
        super(props)
        const { type, showNum } = this.props
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
    render() {
        return(
            <div>hahha</div>
        )
    }
}