import React, { Component } from 'react';
import axios from 'axios';
import makeToast from "../toaster";
import wedding from "../images/wedding.jpg"
import user from "../images/logo.png"
import sent_img from "../images/send.jpg"
import { FiEdit ,RiDeleteBin6Line, ImStarEmpty } from 'react-icons/all';
import { Link } from 'react-router-dom';

export default class Delete extends Component {

    constructor(props) {
        super(props);
      
        this.m_id  = this.props.location.m_id ;

       

        this.onSubmit = this.onSubmit.bind(this);

    

     

        this.state = {

          
           
         username : sessionStorage.getItem('username'),
            msg: '' ,
          
          //  id : sessionStorage.getItem('id') ,
           // edit_msg :[],
        
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
                  
                  this.setState({ msg: response.data.message ,
                    username : response.data.username
                 
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
  
           /////////////////////////////// delete on comments ////////////////////
           axios.delete("http://localhost:8088/home/deleteMsg/"+this.m_id , {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("CC_Token"),
            },
          }) 
          .then(
          response => {
            makeToast(" Deleted successfully", response.data);
            // console.log("updated"+response.data);
            this.props.history.push('/home');
          })
            .catch((error) => {
                  console.log(error);
                })
        }
        

  
  

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


{/* <div> <table>
{this.renderMessage()} 
</table>
     </div> */}


    

  <form  onSubmit={this.onSubmit} >
    
  <p className="card-text">
 <h3 className="data"> {this.state.msg} </h3>
 <br /> 
  <h5 className="delete_f">Are You Sure You Want To Delete ? </h5>

  </p>
  <button type="submit" className="btn" >Yes</button>
  
  <Link className="edit-delete"
           to={
               { pathname:"/home" 
      }
    }
      > <button  > No</button> </Link>
      

  </form>
     
</div>

</div>

</div>
</div>

   </div>

 );
}
}