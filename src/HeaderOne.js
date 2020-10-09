import React, {Component,Fragment} from 'react';
import store from './store.js'


class HeaderOne extends Component{
	
	constructor(props) {  //构造方法
	    super(props);
		this.state = store.getState()
		
		//监听 store 改变
		store.subscribe(()=>{
			this.setState(store.getState())
		})
	}
	
	render() {
		return ( 
		<Fragment>
			<h1>
				Header One, {this.state.msg}
			</h1>
		</Fragment>
		);
	}
}


export default HeaderOne;
