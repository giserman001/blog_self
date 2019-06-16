import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translateMarkdown } from '@/lib/util'

import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import './index.less'

import { Button, Input, Modal, BackTop } from 'antd'

class Edit extends Component {
    state = {
        value: '',
        title: '',
        tagList: [],
        categoryList: [],
        isEdit: false // 组件状态 更新或创建
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }
    render() {
        return (
            <div className="edit">
                <div className="blog-formItem">
                    <span className="label">标题: </span>
                    <Input
                        placeholder="输入文章标题"
                        className="title-input"
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }
}

