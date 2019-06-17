import React, { Component } from 'react'
// import { getCommentsCount } from '@/lib/util'
import { Table, Button, Modal, message } from 'antd'
import QueryForm from './queryForm'
import moment from 'moment'
import './index.less'

class UserManage extends Component {
  state = {
    query: {},
    list: [],
    pagination: {},
    loading: false
  }
  componentDidMount() {
    // 默认加载列表数据
    this.fetchList({ current: 1 })
  }
  getColumns = () => {
    return [{
      title: '用户名',
      dataIndex: 'username'
    },
    // {
    //   title: '评论数',
    //   dataIndex: 'comments',
    //   render: (text) => {
    //     const count = getCommentsCount(text)
    //     return count !== 0 ? <Badge count={count} style={{backgroundColor: '#52c41a'}} /> : count
    //   },
    //   sorter: (a, b) => {
    //     return getCommentsCount(a.comments)-getCommentsCount(b.comments)
    //   }
    // },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      sorter: (a, b) => {
        return moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1
      }
    },
    {
      title: '操作',
      render: (text, record) => {
        return <Button type="danger" onClick={() => this.handleDelete(record.id, record.username)}>
          删除
        </Button>
      }
    }]
  }
  handleDelete = (userId, username) => {
    Modal.confirm({
      title: '您确认删除该用户?，此操作不可恢复！',
      content: `用户：${username}`,
      onOk: () => {
        // 删除请求操作
        this.axios.delete('/user/delete', {
          params: {
            userId
          }
        }).then(res => {
          this.fetchList(this.state.pagination)
          message.success(res.message)
        })
      }
    })
  }
  handleChange = (pagination) => {
    this.fetchList({ ...pagination, ...this.state.query })
  }
  getQuery = query => {
    this.setState({query})
    this.fetchList({ current: 1 , ...query})
  }
  fetchList = ({ current = 1, pageSize = 10, ...query }) => {
    this.setState({ loading: true })
    this.axios.get('/user/getUserList', { params: { 
      page: current,
      pageSize,
      ...query 
    }}).then(res => {
      const pagination = {
        current,
        pageSize,
        total: res.count
      }
      this.setState({ list: res.rows, pagination, loading: false })
    })
  }
  render() {
    const { list, pagination, loading } = this.state
    return (
      <div>
        <QueryForm getQuery={this.getQuery} />
        <Table
          rowKey="id"
          bordered
          columns={this.getColumns()}
          loading={loading}
          dataSource={list}
          pagination={pagination}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default UserManage
