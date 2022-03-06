import { Component } from "react";
import axios from 'axios'
import {connect} from 'react-redux'
import Comments from '../Comments/Comments'
import './post.css'
class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            description: '',
            img: '',
            author: '',
            authorId: '',
            authorImg: '',
            isUserAuthor: false,
            postSettings: false,
            editPostDropdown: false
        }
        this.deletePost = this.deletePost.bind(this)
        this.editPost = this.editPost.bind(this)
    }

    componentDidMount() {
        axios
            .get(`/api/post/${this.props.match.params.id}`)
            .then(res => {
                const {description, img_link, username, profile_picture, author_id} = res.data
                this.setState({
                    description: description,
                    img: img_link,
                    author: username,
                    authorId: author_id,
                    authorImg: profile_picture
                })
                if(this.props.userId === this.state.authorId){
                    this.setState({isUserAuthor: true})
                }
            })
    }
    editPost(){
        axios.put(`/api/post/${this.props.match.params.id}`, this.state)
        .then(() => this.props.history.push(`/dashboard`))
    }
    deletePost(){
        axios.delete(`/api/post/${this.props.match.params.id}`)
        .then(() => this.props.history.push('/yourdex'))
    }
    render(){
        const {description, img, author, authorImg} = this.state
        return(
            <div className="parent-container">
                <div className="individual-post-container">
                    
                        <div className="info-container">
                        <div className="user-info-container">
                            {
                            authorImg 
                            ?
                            <img alt="author pfp" className='profilePicture' src={authorImg}/>
                            :
                            <img alt="author no pfp" className='profilePicture' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'/>
                            }
                            <h3>{author}</h3>
                            <img alt="settings cog" src="https://icon-library.com/images/white-settings-icon/white-settings-icon-0.jpg" className="post-settings" onClick={() => this.state.postSettings ? this.setState({postSettings: false}) : this.setState({postSettings: true})}/>
                            {
                            this.state.isUserAuthor && this.state.postSettings
                            ? 
                            <div className='settings'>
                                <div className='dropdown-container'>
                                    <div className="button-list">
                                        <button className='edit-post-toggle' onClick={() => this.state.editPostDropdown ? this.setState({editPostDropdown: false}) : this.setState({editPostDropdown: true})}>Edit Post</button>
                                        <button className='delete-post' onClick={this.deletePost}>Delete Post</button>
                                    </div>
                                    {
                                    this.state.editPostDropdown ? 
                                    <div className="edit-post-dropdown">
                                        <textarea className='edit-post-textarea' value={this.state.description} onChange={(e) => this.setState({description: e.target.value})}></textarea>
                                        <button className='submit-edit-post' onClick={this.editPost}>Submit</button>
                                    </div>
                                    :
                                    null
                                    }

                                </div>
                            </div> 
                            : 
                            null
                            }
                        </div>
                        {description}
                        </div>
                    <div className="individual-post-wrapper">
                        <div className="img-container">
                        <img alt="post img" className="post-img" src={img}/>
                        </div>
                    <Comments postId={this.props.match.params.id} isUserAuthor={this.state.isUserAuthor}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userId: state.userId,
        username: state.username
    }
  }

export default connect(mapStateToProps)(Post)