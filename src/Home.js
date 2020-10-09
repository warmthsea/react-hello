import React, {Component,Fragment} from 'react';
import App from './App';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

class Home extends Component{
	
	constructor(props) {  //构造方法
	    super(props);
	}
	
	render() {
		return ( 
			<BrowserRouter>
				<App></App>
				<hr className='red-hr' />
				
				{/*一级路由*/}
				<Switch>
					<Route path="/Content/:id/:title" component={Content} />
					<Route path="/Footer" component={Footer} />
					<Route path="/" component={Header} />
				</Switch>
				
			</BrowserRouter>
 		);
	}
}


export default Home;
