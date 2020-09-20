import React, { Component } from 'react';
import axios from 'axios';
import makeToast from "../toaster";
import wedding from "../images/wedding.jpg"
import user from "../images/logo.png"
import sent_img from "../images/send.jpg"
import { Link } from 'react-router-dom';

export default class Reply extends Component {

    constructor(props) {
        super(props);
      
        this.m_id  = this.props.location.m_id ;

        this.onChangeReply = this.onChangeReply.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

    

     

        this.state = {

          
           
         username : sessionStorage.getItem('username'),
            msg: '' ,
          
          //  id : sessionStorage.getItem('id') ,
           // edit_msg :[],
        
         data_msg:'' ,
         reply:'' ,
         mm : '' , 
         replies :[]

        
        }
       
      
    }
  
    

    onChangeReply(e){
      this.setState({ 
        reply: e.target.value 
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
                    user : response.data.username
                 
                 }
                
                 )
                 this.state.data = response.data.message
                 console.log("msgs"+response.data.replies.messages)
              }).catch((error) => {
                      console.log(error);
                    })
          
             
    
 
            
          }

  /////////////////////////////// reply on comments ////////////////////
       
          onSubmit(e) {
            e.preventDefault()
            const data = {
                username : sessionStorage.getItem('username'),
                messages:this.state.msg
              }
         
           axios.post("http://localhost:8088/home/reply/"+this.m_id ,(data), {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("CC_Token"),
            },
          }) 
          .then(
          response => {
              
            makeToast(" replied successfully", response.data.replies.messages);
            // console.log("updated"+response.data);
          this.mm =  response.data.replies.messages
          console.log(this.mm)
            this.props.history.push('/home' ,this.mm );
          })
            .catch((error) => {
                  console.log(error);
                })
        }
        

//         rendercomments() {

  
//             return this.state.replies.replies.map(item => {
//               console.log(item.username)
            
//                     return(
//                       <tr key={item._id}>
//                          <td className="user"> <img src={user} alt="username" className="user_logo" ></img>
//                    {item.username} 
                  
//                    </td>
                 
//                   <td className="msg_text">{item.messages}
// </td>
//                       </tr>

               
//                     )
  
// })

                   
// }

  
  

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
 
    <span>{this.state.user}</span> <h3 className="data"> {this.state.msg} </h3>

    <textarea  type="text" name="message" placeholder="Write Your Comment Here" className="form-control" onChange={this.onChangeReply}     ></textarea>


<button type="submit" > Reply </button>


  </p>

  
  {/* 
   */}
      

  </form>
     
</div>

</div>

</div>
</div>

   </div>

 );
}
}