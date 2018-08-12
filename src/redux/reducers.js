import {combineReducers} from 'redux'
const initData=[];
function reducer1(state= initData,action) {
  console.log('reducer1()',action)
  switch (action.type){
    default:
      return state;
  }
}
const initState={};
function reducer2(state= initState,action) {
  console.log('reducer2()',action)
  switch (action.type){
    default:
      return state;
  }
}
export default combineReducers({reducer1,reducer2});