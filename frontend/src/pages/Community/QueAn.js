import React, {useState,useEffect} from 'react';
import './community.css'
import {Button, Table} from "react-bootstrap";
import axios from 'axios'
import {useHistory} from "react-router-dom";
import {MDBIcon} from "mdbreact";
import Pagination from "./Pagination";
import Posts from "./Post";


const QueAn = () => {
  const [postList, setPostList] = useState([])
  const [questionCategory, setQuestionCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [sendList, setSendList] = useState([])
  const [creationDate, setCreationDate] = useState('')
  const [click, setClick] = useState(0);
  const history = useHistory()

//현재페이지
  const [postsPerPage] = useState(10)
  //한 페이지에서 보여줄 수 있는 postList 수
  const [loading, setLoading] = useState(false)
  const indexOfLastPost = currentPage * postsPerPage;
  //해당 페이지에서 마지막 postList의 index 번호
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //해당 페이지에서 첫번째 post의 index 번호
  const currentPosts = sendList.slice(indexOfFirstPost, indexOfLastPost);
  // 각 페이지에서 보여질 포스트 배열
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < currentPosts.length) {
      setCurrentPage(currentPage + 1);
    } else if (postsPerPage < currentPosts.length) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };




  useEffect(() => {
    axios
      .get('https://server.woojundev.site/H2O/board/list/get/questionAnswer')
      .then(({data})=>{
        console.log(data);
        setPostList(data);
        setCreationDate(data);
        setClick(data);
      })
      .catch((err)=>{
        throw err;
      })
  }, [])

  const changeQueCategory = (e)=>{
    setQuestionCategory(e.target.value)
    if (e.target.value==='전체보기'){
      setSendList(postList)
    }else{
      setSendList([])
      console.log(e.target.value)
      postList.forEach(post=>{
        if (post.questionCategory===e.target.value) {
          console.log(post)
          setSendList((sendList)=>[...sendList, post])
        }
      })

    }
  }


  return (
    <>

      <div>
        <Table
          className="community-table"
          responsive hover style={{ textAlign: "center" }}>
          <thead>
          <tr>
            <th className="form-select">번호</th>
            <th className="form-select">사용자ID</th>
            <th className="form-select">
              <select
                value={questionCategory}
                onChange={changeQueCategory}
              >
                <option>*사용구분</option>
                <option>전체보기</option>
                <option>사용질문</option>
                <option>결제질문</option>
                <option>오류질문</option>
              </select>
            </th>
            <th className="form-select-title">게시물 제목</th>

            <th className="form-select">등록날짜</th>
            {/*<th className="form-select">조회수</th>*/}
            <th className="form-select">조회수</th>
          </tr>
          </thead>
          <tbody>
          <Posts sendList={currentPosts} loading={loading} cate={"questionCategory"}/>

          </tbody>
        </Table>

        <div className="button-right">
          <Button variant="outline-blue " onClick={()=>{history.push('/Edit')}}><MDBIcon far icon="edit" />글쓰기</Button>
        </div>
        <div
          className="pagiantion-comu"
        >
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={sendList.length}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
        />
        </div>
      </div>
    </>
  )
}

export default QueAn;