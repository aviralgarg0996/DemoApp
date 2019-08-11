import React, { Component } from 'react'
import {SafeAreaView,Text,
    FlatList,ActivityIndicator,Alert,Dimensions,
    Image,View,ImageBackground,StyleSheet} from "react-native"
import { connect } from "react-redux";
import axios from "axios"
import { loadUserData, resetData } from '../actions/UserActions';
const {width,height}=Dimensions.get("window")
class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            page:1,
            refresh:false
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
              this.setState({refresh:false})
              if(response.data.success)
            this.props.loadUserData(response.data.meals.data);
          })
          .catch((error)=>{
           Alert.alert("Something went wrong!")
          });
    }

    loadMoreMeals=()=>{
            this.setState({
                          page:this.state.page+1
                      },()=>{
                             this.getAllData()
                             })
    }
    resetData=()=>{
        this.setState({refresh:true})
        this.props.resetState()
        this.setState({page:1},()=>{
            this.getAllData()
        })
    }

    _renderItem=(data)=>{
        let item=data.item
        return(
            <View>
                <View style={styles.userView}>
                    <Image source={{uri:item.user.profile_pic_url}} style={styles.userImage}
                    resizeMode='cover'
                    />
                    <Text >{item.user.username}</Text>
                </View>
            <ImageBackground source={{uri:item.photo}} style={{width:width,height:height/3}}
            resizeMode='cover'>
            <View style={styles.detailsView}>
            <Text style={styles.textStyle}>{item.title}</Text>
            <Text style={styles.textStyle}>{item.restaurant.place_name}</Text>
            </View>  
            </ImageBackground>
            <View style={styles.commentView}>
            <Text>{item.likes_count.length} Likes</Text>
            <Text>{item.comments_count.length} comments</Text>

            </View>
            </View>
        )
    }
  render() {
      if(this.props.data.length){
          return(<SafeAreaView>
            <FlatList
            data={this.props.data}
            renderItem={this._renderItem}
            onRefresh={this.resetData}
            refreshing={this.state.refresh}
            onEndReachedThreshold={0}
            onEndReached={this.loadMoreMeals}
            />
        </SafeAreaView>)
      }
        else
        return (
            <SafeAreaView style={styles.container}>
        <ActivityIndicator size={"small"} color="black"/>
        </SafeAreaView>)
  }
}
function mapStateToProps(state){
return{
    data:state.data
}
}
function mapDispatchToProps(dispatch){
    return{
        loadUserData:(data)=>dispatch(loadUserData(data)),
        resetState:()=>dispatch(resetData())
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    detailsView:{
        height:50,
        backgroundColor:"black",
        opacity:0.5,
        position:"absolute",
        bottom:0,
        width,
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row",
        paddingHorizontal:15
    },
    commentView:{
        height:30,
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row",
        paddingHorizontal:15
    },
    textStyle:{
        color:"white"
    },
    userView:{
        flexDirection:'row',
        alignItems:"center",
        marginVertical:10,
        paddingHorizontal:15
    },
    userImage:{
        width:60,
        height:60,
        borderRadius:30,
        marginRight:15
    }

})
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);