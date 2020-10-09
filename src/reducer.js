const  defaultState = {
	name: '...Tom',
	msg: 'Jack',
	list: [6]
	
}

export default (state = defaultState,action)=>{
	
	if(action.type === 'change_mag'){
		let tempState = state;
		tempState.msg = action.msg;
		return tempState;
	}
	
	//初始化list
	if(action.type === 'init_list'){
		let tempState = state;
		tempState.list = tempState.list.concat(action.list) 
		return tempState;
	}
	
	return state;
}