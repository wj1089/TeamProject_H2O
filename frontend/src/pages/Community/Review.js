import React, {useEffect, useState} from "react";
import {Container, Button, Table,} from "react-bootstrap";
import 'react-quill/dist/quill.snow.css';
import './styles.css'
import './community.css'
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import {MDBIcon} from "mdbreact";

const Review = ({match}) => {
  console.log(match)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [boardNo, setBoardNo] = useState('')
  const [readOnly, setReadOnly] = useState(true)
  const [creationDate, setCreationDate] = useState('')
  const [click, setClick] =useState(0)
  const history = useHistory()

  const handleQuill = (value) => {
     setContent(value)
  }


  useEffect(() => {
    axios
      .get(`https://server.woojundev.site/H2O/board/list/getOne/${match.params.boardNo}`)
      .then((res) => {
        console.log(`java에서 넘어온 data` + res.data.boardNo)
        setBoardNo(res.data.boardNo)
        setTitle(res.data.title)
        setContent(res.data.content)
        setClick(res.data.click)
        setCreationDate(res.data.creationDate)
        // setContent(res.data.boardNo)
        //  setTitle(res.data.title)
      })
      .then((err) => {
        throw err;
      })
  }, [])


//게시물 수정후 업데이트
  const updateBoard = e => {
    e.preventDefault();
    console.log(`boardNo : ${boardNo}, title : ${title}, content : ${content}`)
    // setReadOnly(false)
    const uploadData = {
    // boardNo: boardNo,
      title: title,
      content: content,
      creationDate: creationDate
    }
    axios
      .patch(`https://server.woojundev.site/H2O/board/modify/${boardNo}`, uploadData)
      .then((res) => {
        console.log(res.data);
        history.push('/Community/userBoard')

      })
      .catch((err) => {
        throw err;
      })
  };

//처음 게시물 제목클릭시 가져오는 데이터
  const getContent = e => {
    e.preventDefault();
    console.log(`=========================`)
    console.log(`boardNo ${boardNo}`)
    //setBoardNo(match.params.boardNo)
    console.log(`click ${click}`)
    setReadOnly(false)

  }
//게시물 삭제
  const deleteBoard = e => {
    e.preventDefault()
    axios
      .delete(`https://server.woojundev.site/H2O/board/list/delete/${match.params.boardNo}`)
      .then((res) => {
        console.log(res)
        history.push('/Community/userBoard')
      })
      .catch((err) => {
        throw err;
      })
  }

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'link', 'image']

    ]
  }

  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'image']

  return (
    <>
      <Container>
        <div className="Rev-tab">
          <Table striped bordered hover size="sm"
                 value={content}
                 readOnly={readOnly}
            // onChange={getContent}
          >
            <thead>
            <tr>
              <th className="table-head">사용자</th>

              <th  className="table-search">
                제목 :
                  {readOnly && title}

                  {!readOnly && (
                    <input
                      value={title}
                      onChange={e=>setTitle(e.target.value)}
                    />)}

              </th>
              <th className="table-head">게시날짜</th>
            </tr>
            </thead>
            <tbody>
            <tr className="Rev">
              <td>
                <textPath
                  className="use-pic">
                  Park.WooJun
                </textPath>
              </td>
              <td>

                {readOnly &&
                <ReactQuill  // 게시물제목 클릭이후 BoardNo를 통한 내용정보를 볼수있음
                  theme="snow"
                  value={content}
                  modules={modules}
                  formats={formats}
                  readOnly
                  className="content-font"
                />}

                  {!readOnly &&
                  <ReactQuill  // 수정하기 클릭이후 내용정보 수정하기 사용가능.
                    theme="snow"
                    value={content}
                    onChange={handleQuill}
                    modules={modules}
                    formats={formats}
                    className="content-font"
                  />
                  }
              </td>
              <td
                className="creationDate"
              >
                {creationDate}
              </td>
            </tr>
            </tbody>
          </Table>

          <textPath>
            
            {readOnly &&
            <div>
              <Button className="fix-btn" //클릭시 수정하기 모드로 변환
                      variant="outline-dark"
                      onClick={getContent}
              ><MDBIcon icon="undo-alt" />수정
              </Button>

              <Button
                variant="outline-dark"
                onClick={deleteBoard}
                className="btn-font"
              >
                <MDBIcon icon="backspace" />삭제
              </Button>
            </div>
            }


            {
              !readOnly &&
              <div>
                <Button className="fix-btn" //클릭시 커뮤니티 창으로 업로드&이동
                        variant="outline-dark"
                        onClick={updateBoard}
                >수정완료
                </Button>
                <Button
                  variant="outline-dark"
                  className="btn-font"
                >
                  <Link to='/Community/userBoard'>뒤로</Link>
                </Button>
              </div>
            }
          </textPath>

        </div>
      </Container>
    </>
  );
};

export default Review;
