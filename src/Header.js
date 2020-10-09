import React, {Component,Fragment} from 'react';
import store from './store.js'
import HeaderOne from './HeaderOne';
import HeaderTwo from './HeaderTwo';

import { Link,Switch,Route } from 'react-router-dom'



class Header extends Component{
	
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
				我是Header , {this.state.msg},
			</h1>
			
			<div style={{display:'flex',flexDirection:'row'}}>
				<div>二级导航</div>&nbsp;&nbsp;&nbsp;
				<Link to='/Header/HeaderOne'>One</Link>&nbsp;&nbsp;&nbsp;
				<Link to='/Header/HeaderTwo'>Two</Link>&nbsp;&nbsp;&nbsp;
				
				{/*二级路由*/}
				<Switch>
					<Route path="/Header/HeaderOne" component={HeaderOne} />
					<Route path="/" component={HeaderTwo} />
				</Switch>
			</div>
			
		</Fragment>
		);
	}
}


export default Header;
