import React, {Component,Fragment} from 'react';
import store from './store.js'

import AppItem from './AppItem.js'
import Header from './Header.js'
import Content from './Content.js'
import Footer from './Footer.js'

import axios from 'axios'
import { Link } from 'react-router-dom'


class App extends Component{
	
	constructor(props) {  //构造方法
		console.log('构造方法执行');
	
	    super(props);
		this.state = {
			msg:  store.getState().msg,
			list: store.getState().list,
			inputValue:''
		}
		
		//监听 store 改变
		store.subscribe(()=>{
			this.setState(store.getState())
		})
		
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleBtnClick = this.handleBtnClick.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	
	handleBtnClick(){
		if(this.state.inputValue){
			//视图更新
			this.setState({
				list:[...this.state.list, this.state.inputValue],
				inputValue:''
			},()=>{
				console.log('完成 setState 视图更新后 执行 回调函数');
				console.log(this.state.list);
			})
		}
	}
	
	handleInputChange(e){
		this.setState({
			inputValue: e.target.value
		})
	}
	
	// 父组件通过属性的形式向子组件传递参数
	// 子组件通过props 接收参数
	
	handleDelete(index){
		console.log(index);
		const list = [...this.state.list]
		list.splice(index,1)
		this.setState({list})
	}
	
	getAppItems() {
		return (
			this.state.list.map((item,index) =>{
				return (
					<AppItem 
					delete={this.handleDelete} 
					content={item} 
					index={index} 
					key={index} 
					/>
				)
			}) 
		)
	}
	
	getBody() {
		return (
			<div>
				<h1>{this.state.msg} App.js</h1>
				
				<div style={{display:'flex',flexDirection:'row'}}>
					<div>一级导航</div>&nbsp;&nbsp;&nbsp;
					<Link to='/Header'>头部</Link>&nbsp;&nbsp;&nbsp;
					<Link to='/Content/1/tit'>主题</Link>&nbsp;&nbsp;&nbsp;
					<Link to='/Footer'>底部</Link>&nbsp;&nbsp;&nbsp;
					<div onClick={()=>{window.location.href = '/'}}>主页</div>
				</div>
			</div>
		)
	}
	
	// 组件有三个阶段
		// Mounting  加载期(初创期): 做一些事情(执行了一些函数)，只执行一次
		// Updating  更新期 setState 数据发生更改
		// Unmounting  卸载期
	
	componentWillMount(){
		console.log('render 组件渲染之前执行的生命周期');
	}
	componentDidMount(){
		console.log('render 组件渲染之后执行的生命周期');
		store.dispatch(this.getList()) //先派发给thunk
	}
	
	
	componentWillUpdate(){
		console.log('修改前执行的生命周期');
	}
	componentDidUpdate(){
		console.log('修改后执行的生命周期');
	}
	
	
	shouldComponentUpdate(){
		console.log("执行中拦截 操作");
		return true
	}
	 
	 
	getList(){
		return (dispatch)=>{
			axios.get("http://localhost:3000/data.json").then((resp)=>{
				let action = {
					type:'init_list',
					list:resp.data.list
				}
				dispatch(action)  //派发给 reducer
			})
		}
	}
	 
	render() {
		console.log('render 执行');
		
		// jsx 语法
		return ( 
			<Fragment>
				<div>
					<input value={this.state.inputValue} onChange={this.handleInputChange} />
					<button className='red-btn' onClick={this.handleBtnClick}>add</button>
					<h1>{this.state.name}</h1>	
				</div>
				<ul>
					{this.getAppItems()}
				</ul>
				<div>
					{this.getBody()}
				</div>	
			</Fragment>
		);
	}
}


export default App;
