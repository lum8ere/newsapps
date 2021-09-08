import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Posts from './Components/Posts';
import Pagination from './Components/Pagination';
import './index.css';
import CreateComments from './Components/CreateComments';


const Hightlight = (props) => {
  const { filter, str } = props

  if (!filter) return str

  const regexp = new RegExp(filter, 'ig')
  const matchValue = str.match(regexp)

  if (matchValue) {
    console.log('matchValue', matchValue)
    console.log('str.split(regexp)', str.split(regexp))
    return str.split(regexp).map((s, index, array) => {
      if (index < array.length - 1) {
        const c = matchValue.shift()
        return <>{s}<span className={'hightlight'}>{c}</span></>
      }
      return s
    })
  }

  return str
}

const Card = (props) => {
  const { title, body, filter } = props
  const light = useCallback((str) => {
    return <Hightlight filter={filter} str={str} />
  }, [filter])

  return (
    <div className={'item'}>
      <div>Post Name:</div>
      <h4>{light(title)}</h4>
      <hr />
      <div>
        Discription:
      </div>
      <h4>
        {light(body)}</h4>
      <hr />
    </div>
  )
}


function App() {
  const [post, setPost] = useState([])
  const [comment, setComment] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [PostPerPage] = useState(10)

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('http://localhost:8000/posts/')
      setPost(res.data)
    }

    const getComment = async () => {
      const res2 = await axios.get('http://localhost:8000/comments/')
      setComment(res2.data)
    }

    getComment()
    getPost()
  }, [])

  const lastPostIndex = currentPage * PostPerPage
  const firstPostIndex = lastPostIndex - PostPerPage
  const currentPost = post.slice(firstPostIndex, lastPostIndex)
  const paginate = pageNumber => setCurrentPage(pageNumber)

  const [filter, setFilter] = useState('')
  const items = useMemo(() => {
    if (filter) {
      return post.filter(item => {
        const matchValue = filter.toLowerCase()
        const { title, body } = item
        if (title.toLowerCase().includes(matchValue)) return true
        if (body.toLowerCase().includes(matchValue)) return true

        return false
      })
    }
    return post
  }, [filter])

  const handleChange = (e) => {
    const { value } = e.target
    setFilter(value)
  }

  return (
    <div className="App">
      <h2 className="alight">Новостная лента</h2>
      <CreateComments/>
      <Posts post={currentPost} comments={comment}></Posts>
      <Pagination
        PostPerPage={PostPerPage}
        totalPost={post.length}
        paginate={paginate}
      />
      <div className={<code>wrap</code>}>
        <div className={'search'}>
          <input className={'input'} value={filter} onChange={handleChange} placeholder={'Поиск'} />
        </div>
        <div className={'content'}>
          {items.map(item => <Card  {...item} filter={filter} />)}
        </div>
      </div>
    </div>
  )
}

export default App;
