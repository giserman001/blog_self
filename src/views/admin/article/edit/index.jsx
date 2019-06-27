import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translateMarkdown } from '@/lib/util'

import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import './index.less'

import { Button, Input, Modal, BackTop } from 'antd'
import SelectCate from './components/cate'

@connect(
    state => state.article
)
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
    componentDidMount() {
        this.smde = new SimpleMDE({
            element: document.getElementById('editor').childElementCount,
            autofocus: true,
            autosave: true,
            previewRender: translateMarkdown
        })
        // 判断是编辑还是新增
        if (this.props.history.location.state) {
            const { articleId } = this.props.history.location.state
        }
    }
    handleSubmit = () => {
        const tags = this.$tagRef.getResult()
        const categories = this.$categoryRef.getResult()
        let params = {
            title: this.state.title,
            content: this.smde.value(),
            categories,
            tags
        }
        if (this.state.isEdit) {
            console.log('我是编辑')
        } else {
            this.axios.post('/article/create', params).then(res => {
                console.log(res)
                Modal.confirm({
                    title: '文章创建成功！是否立即查看？',
                    onOk: () => {
                        console.log('go article')
                    }
                })
            })
        }

    }
    render() {
        const { title, value, categoryList, tagList, isEdit } = this.state
        return (
            <div className="edit">
                <div className="blog-formItem">
                    <span className="label">标题：</span>
                    <Input
                        placeholder="请输入文章标题"
                        className="title-input"
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                    />
                </div>
                <SelectCate
                    type="category"
                    showNum={10}
                    onRef={el => (this.$categoryRef = el)}
                    list={categoryList}
                    isEdit={isEdit}
                />
                <SelectCate
                    type="tag"
                    showNum={12}
                    onRef={el => (this.$tagRef = el)}
                    list={tagList}
                    isEdit={isEdit}
                />
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
