import React, { Component, Fragment } from 'react'
import MemesList from '../cards/MemesList';
import {Button} from 'react-bootstrap';
import MemePreview from '../cards/MemePreview';
import Pagination from '../layouts/Pagination';

export class AddMeme extends Component {
  state={
    name:'',
    caption:'',
    url:'',
    showAddMeme:false,
    showMemePreview:false,
    // showMeme:[],
    // currentPage:1,
  }
  // componentDidMount(){
  //   let arr=[];
  //   for(let i=0;i<Math.min(this.props.memes.length,5);i++) arr.push(this.props.memes[i]);
  //   this.setState({showMeme:arr})
  // }
  onChange =(e) =>{
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit =(e) =>{
    e.preventDefault();
    this.props.postMemeOnSubmit(this.state.name,this.state.caption,this.state.url);
    this.setState({name:'',caption:'',url:'',showMemePreview:false});
    this.toggleShowAddMeme();
  }
  toggleShowAddMeme =() =>{
    const value = this.state.showAddMeme;
    this.setState({showAddMeme:!value});
  }
  toggleShowMemePreview =() =>{
    this.setState({showMemePreview:!this.state.showMemePreview});
  }
  setCurrentPage =(pageNumber) =>{
    this.setState({currentPage:pageNumber});
  }
  setShowMemes =(pageNumber) =>{
    let arr=[];
    for(let i=pageNumber*5;i++;i<this.props.memes.length){
      arr.push(this.props.memes[i]);
    }
    this.setState({showMeme:arr});
    this.setCurrentPage(pageNumber);
  }
  render() {
    const {memes,loading} = this.props;
    return (
      <Fragment >
        <div style={{display:'flex',justifyContent:'flex-end'}} className="container">
        {this.state.showAddMeme==false && <Button variant="outline-dark" onClick={this.toggleShowAddMeme} style={{margin:'0.5rem'}}>Add Meme</Button>}
        {this.state.showAddMeme==true && <Button variant="outline-danger" onClick={this.toggleShowAddMeme} style={{margin:'0.5rem'}}>Close X</Button>}
        </div>
        {this.state.showAddMeme && <section className='container' style={{backgroundColor:'whitesmoke',border:'black 0.25rem dotted'}}>
        <div style={{textAlign:'center',backgroundColor:'whitesmoke'}}><b><h2>Add Memes</h2></b></div>
      <form onSubmit={this.onSubmit} style={formStyle}>
        <div style={labelDivStyle}>
        <label htmlFor="name" style={{textAlign:'center'}}><h4>Name:</h4></label>
        </div>
        
        <input type="text" name="name" style={inputStyle} 
          value={this.state.name} 
          onChange={this.onChange}/>
        <div style={labelDivStyle}>
        <label htmlFor="caption"  style={{textAlign:'center'}} ><h4>Caption:</h4></label>
        </div>
        <input type='text' name='caption'  style={inputStyle}
           value={this.state.caption}
           onChange={this.onChange}/>
        <div style={labelDivStyle}>
        <label htmlFor="url"  style={{textAlign:'center'} }><h4>URL:</h4></label>
        </div>
        <input type ='text' name='url'  style={inputStyle}
          value={this.state.url}
          onChange={this.onChange}/>
        <input type='submit' value='Submit' className='btn' style={submitStyle}/>
      </form>
       {this.state.name!='' && this.state.caption!='' &&
          <MemePreview 
            name={this.state.name}
            caption={this.state.caption}
            url={this.state.url}
            showMemePreview={this.state.showMemePreview}
            toggleShowMemePreview={this.toggleShowMemePreview}
            />
        }
      </section>}
        
      <div className="container" style={{border:'0.25rem dashed #ccc',marginTop:'1rem'}}>
        <div style={{textAlign:'center'}}><h3>Latest Memes</h3></div>
      <MemesList memes={memes} loading={loading} 
          editButtonPress ={this.props.editButtonPress}
          delButtonPress ={this.props.delButtonPress}/>
      </div>
      {/* <Pagination 
        isHome={true} 
        currentPage={this.state.currentPage} 
        memes={memes}
        setShowMemes={this.setShowMemes}
        /> */}
      </Fragment>
    )
  }
}
const labelDivStyle ={gridColumnStart:'second' ,gridColumnEnd:'third',alignSelf:'center',marginBottom:'1rem'}
const inputStyle = {gridColumnStart:'third' ,gridColumnEnd:'fourth',padding:'5px',marginBottom:'1rem'}
const submitStyle = {gridColumnStart:'third' ,gridColumnEnd:'fourth',padding:'5px',backgroundColor:'slategray',marginBottom:'1rem'}
const formStyle = {display:'grid',gridTemplateColumns:'[first] 1fr [second] 1fr [third] 1fr [fourth] 1fr [fifth]',gridTemplateRows:'[first] 1fr [second] 1fr [third] 1fr [fourth]',backgroundColor:'whitesmoke'}
export default AddMeme
