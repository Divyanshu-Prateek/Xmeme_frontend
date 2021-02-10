import React, { Component, Fragment } from 'react'
import MemesList from '../cards/MemesList'
import axios from 'axios';

class Memes extends Component {
  constructor(props){
    super(props);
  }
  state={
    loading:false,
    memes:[],
    meme:{},
    id:null,
    sortBy:'id',
    order:'desc',
    searchMeme:'',
    skip:0,
    take:5,
    currentPage:1
  }
  componentWillMount(){
    console.log('Memes Page here\n');
    this.getAllMemesByParams();
  }
 
   // Get all memes
   getAllMemesByParams = async() =>{
    this.setState({loading:true});
    const sortBy=this.state.sortBy;
    const order=this.state.order;
    const skip=this.state.skip;
    const take=this.state.take;
    let reqApi = `http://localhost:8081/api/memes/display?sortBy=${sortBy}&order=${order}&skip=${skip}&take=${take}`;

    return axios.get(reqApi)
              .then((res)=>{console.log(res.data.data); this.setState({loading:false,memes:res.data.data})})
              .catch((err)=>console.log(err.message))
    // const res = await axios.get('http://localhost:8081/memes');
    // console.log(res);
    // this.setState({loading:false,memes:res.data.data});
  }
  onChange =(e) =>{
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit =(e) =>{
    e.preventDefault();
    this.getAllMemesByParams();
  }
   // del button press
   delButtonPress =(meme) =>{
    console.log('Delete Meme' +meme.id);
    this.setState({memes: [...this.state.memes.filter((memeData)=> memeData!=meme)]});
  }

  render() {
  //const {memes,loading} = this.props;
    return (
      <Fragment>
        {/* <div>Meme Page</div> */}
        <section>
          <b>
            <Fragment >
              <section className='container'  style={{backgroundColor:'whitesmoke',border:'black 0.25rem dashed'}}>
              <div  style={{textAlign:'center',backgroundColor:'whitesmoke'}}><b><h2>Search Memes</h2></b></div>
              <form  style={formStyle} onSubmit={this.onSubmit}>
                <div style={labelDivStyle}>
                  <label htmlFor='searchMeme'><h4>Search: </h4></label>
                </div>
              <input type="text" name='searchMeme' placeholder='Meme Search goes here...' style={inputStyle} onChange={this.onChange}/>
              <div style={labelDivStyle}>
                <label htmlFor='sorBy'><h4>Sort By: </h4></label>
              </div>
              <select name="sortBy" style={inputStyle} onChange={this.onChange}>
                <option value="id">Date Created</option>
                <option value="caption">Caption</option>
                <option value="name">Name</option>
              </select>
              <div style={labelDivStyle}>
                <label htmlFor='order'><h4>Order: </h4></label>
              </div>
              <select name="order" style={inputStyle} onChange={this.onChange}>
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
              <input type='submit' value='Submit' className='btn' style={submitStyle}/>
              </form>
              </section>
            </Fragment>
            </b>
        </section>
        <div className="container" style={{border:'0.25rem dashed #ccc',marginTop:'1rem'}}>
        <div style={{textAlign:'center'}}><h3>Filtered Memes</h3></div>
          <MemesList memes={this.state.memes} loading={this.state.loading} 
          editButtonPress ={this.props.editButtonPress}
          delButtonPress ={this.delButtonPress}
          />
        </div>
        
      </Fragment>
    )
  }
}

const submitStyle ={gridColumnStart:'third' ,gridColumnEnd:'fourth',padding:'5px',marginBottom:'1rem',backgroundColor:'slategray'}
const labelDivStyle ={gridColumnStart:'second' ,gridColumnEnd:'third',alignSelf:'center',textAlign:'center'}
const formStyle ={
  display:'grid',gridTemplateColumns:'[first] 1fr [second] 1fr [third] 1fr [fourth] 1fr [fifth]',gridTemplateRows:'[first] 1fr [second] 1fr [third] 1fr [fourth]',backgroundColor:'whitesmoke'
}
const inputStyle = {gridColumnStart:'third' ,gridColumnEnd:'fourth',padding:'5px',marginBottom:'1rem'}

export default Memes
