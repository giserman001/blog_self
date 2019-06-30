import React, { Component } from 'react'

import './index.less'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { random } from '@/lib'
import { Table, Divider, Tag, Modal, message, Badge } from 'antd'
import moment from 'moment'
import QueryForm from './queryForm'

class Manager extends Component {
    state = {
        colorMap: {},
        list: [],
        pagination: {},
        total: 0,
        loading: false
    }
}

export default Manager
