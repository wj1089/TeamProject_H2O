import React, {useState,useEffect} from 'react';
import './community.css'
import {Button, Table} from "react-bootstrap";
import axios from 'axios'
import { useHistory} from "react-router-dom";
import {MDBIcon} from "mdbreact";
import Posts from "./Post";
import Pagination from './Pagination';

const CommunityTem = () => {
    const [postList, setPostList] = useState([])
    const [medCategory, setMedCategory] = useState('')
    const [sendList, setSendList] = useState([])
    const [creationDate, setCreationDate] = useState('')
    const [click, setClick] = useState(0);
    const history = useHistory()
    const [currentPage, setCurrentPage] = useState(1)

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
          .get('https://server.woojundev.site/H2O/board/list/get/boardUser')
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


    const changeCategory = (e) => {
        setMedCategory(e.target.value)
        console.log("test")
        if (e.target.value==='전체보기'){
            setSendList(postList)
        }else{
            setSendList([])
            console.log(e.target.value)
            postList.forEach(post=>{
                if (post.medCategory===e.target.value) {
                    console.log(post)
                    setSendList((sendList)=>[...sendList, post])
                }
            })
        }
    }



    return (
      <>
              <Table
                className="community-table"
                responsive hover style={{ textAlign: "center" }}>
                  <thead>
                  <tr>
                      <th className="form-num">번호</th>
                      <th className="form-user">사용자ID</th>
                      <th className="form-select">
                          <select
                            value={medCategory}
                            onChange={changeCategory}
                            className="table-menusize"
                          >
                              <option>*진료과구분</option>
                              <option>전체보기</option>
                              <option>정형외과</option>
                              <option>내과</option>
                              <option>성형외과</option>
                              <option>흉부외과</option>
                              <option>마취통증의학과</option>
                              <option>가정의학과</option>
                              <option>정신과</option>
                              <option>이비인후과</option>
                              <option>일반외과</option>
                              <option>재활의학과</option>
                              <option>신경과</option>
                              <option>소아과</option>
                              <option>피부과</option>
                              <option>여성의학과</option>
                          </select>
                      </th>
                      <th className="form-select-title">게시물 제목</th>
                      <th className="form-select">등록날짜</th>
                      <th className="form-select">조회수</th>
                  </tr>
                  </thead>
                  <tbody>
                        <Posts sendList={currentPosts} loading={loading} cate={"medCategory"} />
                  </tbody>
              </Table>

              <div className="button-right">
                  <Button variant="outline-blue" onClick={()=>{history.push('/Edit')}}><MDBIcon far icon="edit" />글쓰기</Button>
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
      </>
    );
};

export default CommunityTem;