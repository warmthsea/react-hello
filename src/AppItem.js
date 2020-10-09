import React,{Component} from 'react';
import Store from './store.js'

class AppItem extends Component {

	// 子组件如果和父组件通信,子组件要调用父组件传递过来的方法
	
	constructor(props) {
		super(props)
		this.handleDelete = this.handleDelete.bind(this)
	}
	
	handleDelete(e){
		this.props.delete(this.props.index)
	}
	
	componentWillReceiveProps(){
		console.log('Props 数据变化时候执行');
	}
	
	render(){
		const { content } = this.props;
		return (
			<div onClick={this.handleDelete}>{content}{Store.getState().name}</div>
		)
	}
}

export default AppItem;