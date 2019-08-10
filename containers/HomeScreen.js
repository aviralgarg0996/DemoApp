import React, { Component } from 'react'
import {SafeAreaView,Text,FlatList} from "react-native"
import { connect } from "react-redux";
import axios from "axios"
import { loadUserData } from '../actions/UserActions';
class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            page:1
        }
    }
    componentDidMount(){
        this.getAllData()
    }
    getAllData=()=>{
        axios.post(`https://looksyummyapp.com/api/meal/feed?page=${this.state.page}`, {
            user_id: 3,
          })
          .then((response)=> {
            this.props.loadUserData(response.data.meals.data);
          })
          .catch((error)=>{
            console.log("error",error);
          });
    }
  render() {
    return (
      <SafeAreaView>
          <FlatList
          data={this.props.data}
          renderItem={({item}) => <Text>{item.id}</Text>}
          />
      </SafeAreaView>
    )
  }
}
function mapStateToProps(state){
    console.log("data",state)
return{
    data:state.data
}
}
function mapDispatchToProps(dispatch){
    return{
        loadUserData:(data)=>dispatch(loadUserData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);