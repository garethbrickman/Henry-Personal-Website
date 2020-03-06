import React, { useState, useEffect } from "react"
import { graphql, StaticQuery } from "gatsby"
import blogLoginStyles from "./blogLogin.module.css"
import BusinessCard from "../BusinessCard"
import PostListing from "../Posts"
import Footer from "../Footer"

let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function zerosAreHard(n) {
  if (n < 10) {
    n = "0" + n;
  }
  return n;
}

let now = new Date();
let day = days[ now.getDay() ];
let month = months[ now.getMonth() ];
let date = now.getDate();
let hours = zerosAreHard(now.getHours());
let minutes = zerosAreHard(now.getMinutes());
let seconds = zerosAreHard(now.getSeconds());
let year = now.getFullYear();

let blogLoginPrompt = "Current login: " + day + " " + month + " " + date + " " + hours +":" + minutes + ":" + seconds + " " + year;

const BlogPosts = data => {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    setTimeout(() => setHidden(false), 900)
  }, [])

  return (
    <div>
      <span >{ blogLoginPrompt }<br />
      Welcome to HenryNeeds.Coffee!</span>
      <br /><br />
      [hquinn@HenryNeeds ~]$ <span className={blogLoginStyles.typed}>&nbsp;cat blog/*<span>&nbsp;</span></span>
      <div className={hidden ? blogLoginStyles.hiddenPart : ""}>
        <BusinessCard />
        <div>
          <h1>Recent Articles</h1>
          <hr />
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <PostListing key={node.id} post={node} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default () => (
  <StaticQuery
    query={graphql`
      query blogPostsQuery {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { type: { eq: "blog" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                category
                date
                desc
                title
              }
              html
              excerpt(pruneLength: 280)
            }
          }
        }
      }
    `}
    render={BlogPosts}
  />
)