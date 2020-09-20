import React, { Component } from 'react';
import axios from 'axios';
import makeToast from "../toaster";
import wedding from "../images/wedding.jpg"
import user from "../images/logo.png"
import sent_img from "../images/send.jpg"
import { FiEdit ,RiDeleteBin6Line, ImStarEmpty } from 'react-icons/all';
import { Link } from 'react-router-dom';

export default class Edit extends Component {

    constructor(props) {
        super(props);
      
        this.m_id  = this.props.location.m_id ;

        this.onChangeMsg = this.onChangeMsg.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

    

     

        this.state = {

          
           
         username : sessionStorage.getItem('username'),
            msg: '' ,
          
          //  id : sessionStorage.getItem('id') ,
            edit_msg :[],
        user:'',
         data_msg:'' ,
         reply:''
        
        }
       
      
    }
  
    onChangeReply(e){
      this.setState({ 
        reply: e.target.value 
    })
    }
  

        onChangeMsg(e) {
            this.setState({ 
                msg: e.target.value 
            })
        }
    
      
    
    
        componentDidMount(){

          
           ////////////////// show other comments //////////////////////////////////
         
       console.log("id "+this.m_id)
              axios.get("http://localhost:8088/home/msg/"+this.m_id  , {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("CC_Token"),
                },
              }) 
              .then(
                response => {
                  
                  this.setState({ data_msg: response.data.message ,
                    user : response.data.username
                 
                 }
                
                 )
                 this.state.data = response.data.message
                 console.log("msgs"+response.data.message)
              }).catch((error) => {
                      console.log(error);
                    })
          
             
    
 
            
          }


       
          onSubmit(e) {
            e.preventDefault()
  
           /////////////////////////////// edit on comments ////////////////////

  const data = {
    username : sessionStorage.getItem('username'),
    message:this.state.msg
  }

  axios.post("http://localhost:8088/home/updateMsg/"+this.m_id ,(data), {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("CC_Token"),
    },
  }) 
  .then(
    response => {
      
     // this.setState({
        makeToast(" updated successfully", response.data);
        // console.log("updated"+response.data);
        this.props.history.push('/home');
      ///////////// should direct to original post
   //  } )
     
  }).catch((error) => {
          console.log(error);
        })
         

    
    }


    // renderMessage(){

    //     return this.state.edit_msg.map(item => {
    //       return(
    //         <tr key={item._id}>
      
    //           <td>{item.message}</td>
    //       <td>{item.username}</td>
    //   </tr>
    //           )
    //     })
      
    //   }
  
    
  
  

    render() {
       
        return (
        
<div className="container">
    <div className="row">
        {/* <div className="col-md-1"></div> */}
        <div className="col-md-12">
<img src={wedding} alt="wedding gustbook" className="wedding_prof"></img>
</div>
    </div>
    <div className="row">
<div className="card-dashboard">
<br></br>


<div className="card">
<div className="card-body">

<p className="card-text">
        <span>{this.state.user}</span>
 <h3 className="data"> {this.state.data_msg} </h3>
 <br /> 
  

  </p>

{/* <div> <table>
{this.renderMessage()} 
</table>
     </div> */}

    

  <form  onSubmit={this.onSubmit} >
    
  <p className="card-text">
  <textarea  type="text" name="message" placeholder="Update Your Comment Here" className="form-control" onChange={this.onChangeMsg}  value={this.state.msg}   ></textarea>


  </p>
  <button type="submit" >Update</button> 

  </form>
     
</div>

</div>

</div>
</div>

   </div>

 );
}
}