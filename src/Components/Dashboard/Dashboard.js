import Axios from "axios";
import { Component } from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './dashboard.css'
class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            allPosts: [],
            userPics: ''
        }
        this.getPosts = this.getPosts.bind(this)
    }
    componentDidMount(){
        this.getPosts()
    }
    getPosts(){
        Axios.get('/api/post').then(res => {
            this.setState({allPosts: res.data.reverse()})
        })
    }

    render(){
        let mappedPosts = this.state.allPosts.map((element) => {
            return(
                <div className="post-container">
                    <Link to={`/post/${element.post_id}`} key={element.post_id}>
                        <div className="user-posts">
                            <div className="user-info">
                                <img alt="profile picture" className="profile-picture" src={element.profile_picture}/>
                                <div className="username">{element.username}</div>
                            </div>
                            <div className="post-img-container">
                                <img alt='post' className="img" src={element.img_link}/>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        })
        return(
            <div className="container dashboardContainer">
                {mappedPosts.length === 0 ? <img alt="loading banana gif" className="loading-banana" src="https://monkidex-bucket.s3.amazonaws.com/e0ac908e-83db-4e58-9e4b-24340037a6ef-banana-96.gif"/> : mappedPosts }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps)(Dashboard)