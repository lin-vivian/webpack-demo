import React from 'react'
import './indexa.css'
import './index.less'

function App () {
    return <h1 className='color-red'>
        <div>webpack打包压缩测试</div>
        <img src={require("../static/images/1.jpg")} alt=""/>
        <img src={require("../static/images/2.jpg")} alt=""/>
        <img src={require("../static/images/3.jpg")} alt=""/>
        <img src={require("../static/images/4.jpg")} alt=""/>
        </h1>
}

export default App