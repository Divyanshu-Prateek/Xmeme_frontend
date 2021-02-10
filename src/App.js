import React, { Component ,Fragment} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import About from './components/pages/About';
import Memes from './components/pages/Memes';
import Error404 from './components/pages/Error404';
import AddMeme from './components/pages/AddMeme';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  state ={
    memes:[
    ],
    meme:{},
    id:null,
    edit:false,
    sortParams:[],
    loading:false,
    alert: null
  }

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }
  componentDidMount(){
    console.log('THis happens first')
    this.getAllMemes()
    
  }

  // Get all memes
  getAllMemes = async() =>{
    this.setState({loading:true});
    return axios.get('http://localhost:8081/memes')
              .then((res)=>{console.log(res.data.data); this.setState({loading:false,memes:res.data.data})})
              .catch((err)=>console.log(err.message))
    // const res = await axios.get('http://localhost:8081/memes');
    // console.log(res);
    // this.setState({loading:false,memes:res.data.data});
  }

  // Get meme by id
  getMemeById = async (id)=>{
    this.setState({loading:true,id:id});
    const res = await axios.get(`http:localhost:8081/memes/${id}`);
    console.log(res);
    this.setState({loading:false,meme:res.data});
  }

  //Post meme 
  postMeme = async (name,caption,url) =>{
    this.setState({id:null});
    const data ={name,caption,url};
    const headers = {
      'Content-Type': 'application/json'
    }
    
    return axios.post('http://localhost:8081/memes',data,{headers})
              .then((res)=>{console.log(res); this.setState({id:res.data.id})})
              .catch((err)=>{console.log(err.message)})
    // console.log(res);
    // this.setState({id:res.data.id});
  }

  // Patch a meme
  patchMeme = async (id,caption,url) =>{
   const data = {url,caption};
   const headers = {'Content-Type': 'application/json'};
   return axios.patch(`http://localhost:8081/memes/${id}`,data,{headers})
              .then((res)=>console.log('Patched\n',res))
              .catch((err)=>{console.log(err)})
   
  }
  // edit button press
  editButtonPress =(editMeme)=>{
    //console.log('Edit meme with id: ',editMeme.id);
    this.setState({loading:true});
    this.patchMeme(editMeme.id,editMeme.caption,editMeme.url)
          .then(()=>{ this.setState({loading:false})})
          .catch((err)=>console.log(err))
  }
  // del button press
  delButtonPress =async (meme) =>{
    console.log('Delete Meme' +meme.id);
    return axios.delete(`http://localhost:8081/memes/${meme.id}`)
              .then(
                (res)=>{ 
                  console.log(res); 
                  this.setState({memes: [...this.state.memes.filter((memeData)=> memeData!=meme)]});
                } 
              )
  }
 // Post MEME on submit
 postMemeOnSubmit = async(name,caption,url) =>{
  console.log(name+'\n'+caption+'\n'+url+'\n Submitted');
   /* what to change: First post the meme and then get the meme to load into the state*/
            this.postMeme(name,caption,url)
            .then(()=>{
              this.getAllMemes()
              .then((res)=>console.log(res))
              .catch((err)=>console.log(err.message))
            })
            .catch(err=>console.log(err))
 }

  render() {
    return (
      <Router>
      <Fragment>
        <div className="app">
          <Navbar />
          <Switch>
            <Route exact path ='/' render = {( props) =>(
              <AddMeme {...props}
                postMemeOnSubmit={this.postMemeOnSubmit}
                getAllMemes={this.getAllMemes} 
                memes={this.state.memes} 
                loading={this.state.loading}
                editButtonPress={this.editButtonPress}
                delButtonPress ={this.delButtonPress}
              />
            )}
            />
            <Route exact path ='/about' render ={About}/>
            <Route exact path ='/memes' render ={(props)=>(<Memes {...props}
              getAllMemes={this.getAllMemes} memes={this.state.memes} loading={this.state.loading}
              editButtonPress={this.editButtonPress}
              delButtonPress ={this.delButtonPress}
            />)}  />
            <Route render ={Error404}/>
          </Switch>
          <Footer />
        </div>
        
      </Fragment>
      </Router>
    )
  }
}


export default App;
