import React, {useState} from 'react'
import {Grid, Button, Icon, OutlinedInput, Box, Container } from '@material-ui/core'
import { Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

const outLined = {
    width : '100px',
    height : '100px',
    border:'1px solid gray',
}

const outLinedComplete = {
    width : 'auto',
    height : 'auto',
    border:'1px solid gray',
}


const inputStyle = {
    
}

const ImgButton = () => {
    const [file, setFile] = useState(null)
    const [previewURL, setPreviewURL] = useState(null) 
    
    const handleFileOnChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if(e.target.files[0]){
        reader.onloadend = () => {
            setFile()
            setPreviewURL(reader.result)
        }
        reader.readAsDataURL(file);
        }else{
            setPreviewURL()
        }
    }

    let preview=null
    if(file!==null){
        preview = <Image 
                    className='profile_preview' 
                    src={previewURL}
                    rounded >
                 </Image>
    }

    return (
        <Container>
            <Row >
                <Col 
                    xs={12}
                    style={previewURL==null? outLined: outLinedComplete}
                    // style={outLined}
                    // style={outLinedComplete}
                    >
                    {previewURL==null? "이미지": null}
                    {preview}
                </Col><br/>
                <Col xs={4}>
                    <input style={inputStyle}
                        accept="image/*"
                        type="file"
                        name="img"
                        onChange={handleFileOnChange}>
                    </input>
                </Col>
            </Row>
            </Container>
        )
}

export default ImgButton

// import React, {useState} from 'react'
// import ImageUploader from "react-images-upload";
// import {Grid} from '@material-ui/core'


// const ImgButton = props => {
//     const [file, setFile] = useState()
//     const [previewURL, setPreviewURL] = useState(null)
    
//     const handleFileOnChange = e => {
//         e.preventDefault();
//         let reader = new FileReader();
//         let file = e.target.files[0];
//         reader.onloadend = () => {
//             setFile()
//             setPreviewURL(reader.result)
//         }
//         reader.readAsDataURL(file);
//         }
    
//     let preview
//     if(file!==''){
//         preview = <img className='profile_preview' src={previewURL}></img>
//     }

//     return (
//         <div>
//         <Grid item xs={8}>
//             {preview}
//         </Grid>
//         <input type='file' 
//             accept='image/jpg,impge/png,image/jpeg,image/gif' 
//             name='profile_img' 
//             onChange={handleFileOnChange}>
//         </input>
//         </div>
//         )

// }

// export default ImgButton