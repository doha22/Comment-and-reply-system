import React, { Component } from 'react';
import axios from 'axios';
import makeToast from "../toaster";
import wedding from "../images/wedding.jpg"
import user from "../images/logo.png"
import sent_img from "../images/send.jpg"
import { FiEdit ,RiDeleteBin6Line} from 'react-icons/all';
import { Link } from 'react-router-dom';

export default class Home extends Component {

    constructor(props) {
        super(props);
      
      //  this.msg_id  = this.props.location.msg_id

        this.onChangeMsg = this.onChangeMsg.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.onChangeReply = this.onChangeReply.bind(this);

       // this.OnReply = this.OnReply.bind(this) ;

       // this.OnDelete = this.OnDelete.bind(this);

        this.state = {
           
         username : sessionStorage.getItem('username'),
            msg: '' ,
           comments:[]  , // empty array
          //  id : sessionStorage.getItem('id') ,
         msg_id:'' ,
         replies :[] ,
       //  reply_id = '' ,
         
         reply:'',
         data_reply : ''
        

        
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
         
       
              axios.get("http://localhost:8088/home/allMsgs" , {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("CC_Token"),
                },
              }) 
              .then(
                response => {
                  
                  this.setState({ comments: response.data,
                  username: response.data ,
                 }
                 
                 )
                 
              }).catch((error) => {
                      console.log(error);
                    })
    
          
          
/////////////////////////////////////////////error///////////////////////////////
 //if (typeof(this.state.msg_id) == 'undefined' || this.state.msg_id != null) {
  // this.state.comments.map(item => {
      
    //   let message_id =  item._id
 
     //  console.log("id= "+  this.state.reply_id )
    

 //})                
            
          }
  /////////////////////////////// delete on comments ////////////////////

  // delete(id){
  //   console.log(id);
  //   axios.delete('/api/book/'+id)
  //     .then((result) => {
  //       this.props.history.push("/")
  //     });
  // }

// OnDelete(idd){
  
//    axios.delete("http://localhost:8088/home/deleteMsg/"+idd, {
//     headers: {
//       Authorization: "Bearer " + localStorage.getItem("CC_Token"),
//     },
//   }) 
//   .then(
//   response => {
//     // makeToast("Deleted Successfully", response.data);
//    console.log("Deleted Successfully",response.data)
//   })
//     .catch((error) => {
//           console.log(error);
//         })
// }



          
  ///////////////////////////////////////reply to comments////////////

OnReply(id){
  const data = {
    username : sessionStorage.getItem('username'),
    messages:this.state.msg
  }

axios.post("http://localhost:8088/home/reply/"+ id,(data), {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("CC_Token"),
  },
}) 
.then(
response => {
  this.setState({ 
  replies: response.data ,
  
 })
 
})
  .catch((error) => {
        console.log(error);
      })
}

          ////////////// creating post ////////////////////
          onSubmit(e) {
            // e.preventDefault()
  
            const data = {
              username : sessionStorage.getItem('username'),
              message:this.state.msg
            }

        axios.post("http://localhost:8088/home/msg" ,(data), {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("CC_Token"),
            },
          }) 
        .then(
          response => {
            this.setState({ 
            message: response.data ,
           })
            // console.log("message_id"+response.data.result.id)
         //   this.state.msg_id = response.data.result.id
           
        })
            .catch((error) => {
                  console.log(error);
                })
    
    }




    // to list the others comments
   rendercomments() {

  
    return this.state.comments.map(item => {
      console.log(item.username)
      if(item.username === sessionStorage.getItem('username')){

      
            return(
              <tr key={item._id}>
                 <td className="user"> <img src={user} alt="username" className="user_logo" ></img>
           {item.username} 
          
           </td>
         
          <td className="msg_text">{item.message}<span>
           
            </span> </td> 
            {/* for only loggin user */}
            {/* <button className="edit-delete">
                 
                  </button> */}
                  {/* <Link to={"edit/"} className="edit-delete"><FiEdit /> </Link> */}
          <Link className="edit-delete"
           to={
               { pathname:"/edit" , m_id : item._id
      }
    }
      > <FiEdit /> </Link>

<Link className="edit-delete"
           to={
               { pathname:"/delete" , m_id : item._id
      }
    }
      >  <RiDeleteBin6Line /> </Link>

                
              <tr>
                
              {/* <span className="comment_reply">  <input type="text" className="reply_input" placeholder="Reply to Comment"   value={this.state.reply} /> <button onClick={() => this.OnReply(item._id)} > 
                <img src={sent_img
              } alt="reply" className="sent_img">
                
                </img> </button></span>  */}
<button> <Link className="edit-delete"
           to={
               { pathname:"/reply" , m_id : item._id
      }
    }
      >   <img src={sent_img
      } alt="reply" className="sent_img">
        
        </img> </Link> </button>
        <input type="text" className="reply_input"    value={this.mm} readOnly />

</tr>
              </tr>
            )
            }else{
              // for other users 
              return(
                <tr key={item._id}>
                    <td className="user"><img src={user} alt="username" className="user_logo"></img>
           {item.username} 
          
           </td>
         
          <td className="msg_text ">{item.message}<span>
           
            </span> </td> 
                
                <tr>
                <button> <Link className="edit-delete"
           to={
               { pathname:"/reply" , m_id : item._id
      }
    }
      >   <img src={sent_img
      } alt="reply" className="sent_img">
        
        </img> </Link> </button>
        <input type="text" className="reply_input"    value={this.mm} readOnly />

</tr>
                </tr>
              )
            }

  
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
  <form  onSubmit={this.onSubmit} >
    
  <p className="card-text">
  <textarea  type="text" name="message" placeholder="Write Your Comment Here" className="form-control" onChange={this.onChangeMsg}  value={this.state.msg}   ></textarea>


  </p>
  <button type="submit" >Post</button> 

  </form>
     
</div>

<table className="table">
          <tbody>
         
          {this.rendercomments()} 

         
         {/* {this.renderReplies()} */}
          </tbody>
        </table>

</div>

</div>
</div>

   </div>

 );
}
}