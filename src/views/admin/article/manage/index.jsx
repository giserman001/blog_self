import React, { Component } from 'react'

import './index.less'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { random } from '@/lib/util'
import { Table, Divider, Tag, Modal, message, Badge } from 'antd'
import moment from 'moment'
import QueryForm from './queryForm'

@connect(state => ({
    colorList: state.common.colorList,
    tagList: state.article.tagList
}))
class Manager extends Component {
    state = {
        colorMap: {},
        list: [],
        pagination: {},
        total: 0,
        loading: false
    }
    componentDidMount() {
        const { colorList, tagList } = this.props
        let colorMap = {}
        tagList.forEach(item => {
            colorMap[item.name] = colorList[random(colorList)]
        })
        this.setState({ colorMap }, () => this.fetchList({ page: 1 }))
    }
    fetchList = ({current = 1, pageSize = 10, ...query}) => {
        this.setState({ loading: true })
        // TODO 写到这里了
    }
    handleChange = () => {

    }
    handleDelete = () => {
        
    }
    getColumns = () => {
        return [
            {
                title: '标题',
                dataIndex: 'title'
            },
            {
                title: '标签',
                dataIndex: 'tags',
                render: (text, record) => {
                    return text.map(d => (
                        <Tag color={'red'} key={d.name}>
                            {d.name}
                        </Tag>
                    ))
                }
            },
            {
                title: '分类',
                dataIndex: 'categories',
                render: (text, record) => {
                    return text.map(d => (
                        <Tag color={'#2db7f5'} key={d.name}>
                            {d.name}
                        </Tag>
                    ))
                }
            },
            {
                title: '评论数',
                dataIndex: 'comments',
                render: () => {
                    return 1
                }
            },
            {
                title: '发布时间',
                dataIndex: 'createdAt',
                sorter: (a, b) => (moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1)
            },
            {
                title: '修改时间',
                dataIndex: 'updatedAt',
                sorter: (a, b) => (moment(a.updatedAt).isBefore(b.updatedAt) ? 1 : -1)
            },
            {
                title: '操作',
                render: (text, record) => {
                    return (
                        <div className="action">
                            <Link>查看</Link>
                            <Divider type="vertical" />
                            <Link>编辑</Link>
                            <Divider type="vertical" />
                            <span className="btn-delete" onClick={() => this.handleDelete(record.id, record.title)}>
                                删除
                            </span>
                        </div>
                    )
                }
            }
        ]
    }
    getQuery = query => {
      this.setState({ query })
    }
    render() {
        const { list, pagination, loading } = this.state
        return(
            <div className="manager">
                <QueryForm getQuery={this.getQuery}/>
                <Table
                    rowKey="id"
                    bordered
                    loading={loading}
                    columns={this.getColumns()}
                    dataSource={list}
                    pagination={pagination}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

export default Manager
