import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Form, Input, Select, DatePicker } from 'antd'
import FormBuilder from '@/components/helper/FormBuilder'
import { connect } from 'react-redux'
const Option = Select.Option

class QueryForm extends Component {
    static propTypes = {
        getQuery: PropTypes.func.isRequired
    }
    render() {
        return (
            <div>queryform</div>
        )
    }
}

export default QueryForm