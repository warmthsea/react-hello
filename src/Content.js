import React, {Component,Fragment} from 'react';
import store from './store.js'


class Content extends Component{
	
	constructor(props) {  //构造方法
	    super(props);
		this.state = store.getState()
		this.btnsubmit = this.btnsubmit.bind(this)
		
		//监听 store 改变
		store.subscribe(()=>{
			this.setState(store.getState())
		})
	}
	
	
	//提交按钮
	btnsubmit(){
		let input = this.refs.inputValue.value;
		console.log(input);
		let action = {
			type: 'change_mag',
			msg: input
		}
		//把action对象派发给reducer
		store.dispatch(action)
		// store.dispatch(this.getDatas())
	}
	
	//模拟获取数据，例如使用ajax 
	getDatas(){
		let list = [4,5,6,7,8]
		
		return list;
	}
	
	render() {
		console.log(this.props.match.params)
		const {id,title} = this.props.match.params
		
		return ( 
			<Fragment>
				<h1>
					id:{id},title:{title} 我是Content , {this.state.msg}
				</h1>
				<p>
					<input  ref="inputValue" />
					<button onClick={this.btnsubmit}>更改 store msg</button>
				</p>
			</Fragment>
		);
	}
}


export default Content;
