import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from "../../axios/Axios";

class Blog extends Component {
  state = {
    posts: [],
    selectedId:null,
    // post:null,
  };

  componentDidMount() {
    axios.get("/posts").then((response) => {
      const postsData = response.data.slice(0, 4);
      const updatedPosts = postsData.map((post) => {
        return {
          ...post,
          author: "shubham",
        };
      });
      this.setState({ posts: updatedPosts });
    });
  }
   openPost = (id)=>{
    this.setState({selectedId:id})
  }

  render() {
    const posts = this.state.posts.map((post) => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.openPost(post.id)}
        />
      );
    });
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
