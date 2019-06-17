import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translateMarkdown } from '@/lib/util'

import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import './index.less'

import { Button, Input, Modal, BackTop } from 'antd'
// import SelectCate from './components/Cate'

class Edit extends Component {
    state = {
        value: '',
        title: '',
        tagList: [],
        categoryList: [],
        isEdit: false // 组件状态 更新或创建
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = () => {
        console.log('确定')
    }
    render() {
        const { title, value, categoryList, tagList, isEdit } = this.state
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
                {/* <SelectCate
                    type="category"
                    showNum={10}
                    onRef={el => this.$categoryRef = el}
                    list={categoryList}
                    isEdit={isEdit}
                />
                <SelectCate
                    type="tag"
                    showNum={12}
                    onRef={el => (this.$tagRef = el)}
                    list={tagList}
                    isEdit={isEdit}
                /> */}
                <br />
                <textarea id="editor" defaultValue={value} />
                <Button onClick={this.handleSubmit} type="primary">
                    {isEdit ? '更新' : '创建'}
                </Button>
                <BackTop />
            </div>
        )
    }
}


export default Edit
