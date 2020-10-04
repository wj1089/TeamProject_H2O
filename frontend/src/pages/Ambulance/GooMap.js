import React,{useState,useCallback,useRef} from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import usePlacesAutocomplete, {getGeocode,getLatLng,getZipCode} from "use-places-autocomplete";
import Geocode from 'react-geocode'
import {Combobox,ComboboxInput, ComboboxPopover,ComboboxList, ComboboxOption,} from "@reach/combobox";
import { MDBCard,MDBCardText } from 'mdbreact';
import './map.css'
import "@reach/combobox/styles.css";
import {Button, Col, Form, Row, Image} from "react-bootstrap";
import mapdata from "./mapdata";
import {Link} from "react-router-dom";
import MapModal from "./MapModal"


const mapContainerStyle ={
    width: "100%",
    height : "680px"
};
const options = {
    zoomControl:true,
};
const center ={
    lat:37.564214,
    lng:127.001699
}

const MAP_KEY = process.env.REACT_APP_GOOGLE_MAP_KEY
const libraries = ["places"];



const GooMap = () =>{
    const { isLoaded,loadError } = useLoadScript({
        googleMapsApiKey: MAP_KEY,
        libraries,
        region:'kr'
    });

    const [ selected, setSelected ] = useState({});
    const [ currentPosition, setCurrentPosition ] = useState({});
    const [ infoShow, setInfoShow ]= useState(false)
    const [ name, setName] =useState('')
    const [ content, setContent] =useState('')

    //출발
    const [ searchedAddr,setSearchedAddr] = useState("");
    //도착
    const [ selectedAddr, setSelectedAddr] = useState("");
    //우편번호
    const [ selectedPc, setSelectedPc ] = useState("")

    const [ markers, setMarkers ] = useState([]);
    const [ searchLocation, setSearchLocation ] = useState({})
    //
    // const handleOpen = () => setInfoShow(true);
    //
    // // const handleReservation = e => {
    // //     e.preventDefault();
    // //     handleOpen();
    // // }


    Geocode.setApiKey(MAP_KEY);
    Geocode.setLanguage('ko')
    Geocode.fromLatLng(selected.lat, selected.lng).then(
        response =>{
            console.log(response)
            const address = response.results[0].formatted_address
            const length = response.results[0].address_components.length
            const postcode = response.results[0].address_components[length-1].long_name
            console.log(postcode.indexOf('-'))
            if(postcode.indexOf('-') !== -1){
                setSelectedPc(postcode)
            }else{
                setSelectedPc("정보없음")
            }
            setSelectedAddr(address)

            console.log(address)
        },
        error=>{
            console.error(error)
        }
    );


    const mapRef = useRef();
    const onMapLoad = useCallback((map)=>{
        mapRef.current = map;
    },[]);

    const panTo = useCallback(({lat, lng})=>{
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(13);
    },[]);

    const onMapClick = useCallback((e)=>{
        setMarkers((current)=>[
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            },
        ]);
    },[])

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    function Search({panTo}) {
        const {
            ready,
            value,
            suggestions: {status, data},
            setValue,
            clearSuggestions
        } = usePlacesAutocomplete({
            requestOptions:{
                location: { lat:()=> 37.5525892, lng:()=> 126.9367663 },
                radius: 200*1000,
            },
        });
        const handleInput = (e)=>{
            setValue(e.target.value);
        };
        const handleSelect = async (address) =>{
            setValue(address, false);
            clearSuggestions();

            try{
                const result =await getGeocode({address});
                const {lat, lng} = await getLatLng(result[0]);
                const postal_code = await getZipCode(result[0],false)
                panTo({ lat, lng });
                setSelectedPc(postal_code)
                setSearchLocation({ lat, lng });
                setSearchedAddr(address);

            }catch (error) {
                console.log("Error: ", error);
            }
        };

        return(
            <div className="mySearch">
                <Combobox onSelect={handleSelect}>
                    <ComboboxInput
                        value = {value}
                        onChange={handleInput}
                        disabled={!ready}
                        placeholder="Search your location"
                        className="comboboxtext"
                    />
                    <ComboboxPopover>
                        <ComboboxList>
                            {status === "OK" &&
                            data.map(({ id,description})=>(
                                <ComboboxOption key={id} value={description}/>
                            ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </div>
        );
    }

//현 위치 검색
    function Locate({panTo}) {
        return(
            <button
                className="locate_img"
                onClick={()=>{
                    navigator.geolocation.getCurrentPosition(
                        (position)=>{
                        const currentPosition ={
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                        panTo(currentPosition);
                        setCurrentPosition(currentPosition);
                    },
                        ()=>null
                    );
                }}
            >
                <img src="https://image.flaticon.com/icons/svg/814/814476.svg"/>
            </button>
        );
    }
    
    return(
        <>
            <br/><br/><br/><br/>
            <Search panTo={panTo}/>
        <div className="map_container map_box">
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={11}
                center={center}
                options={options}
                onLoad={onMapLoad}
                onClick={onMapClick}
            >
                <Locate panTo={panTo}/>


                {//지도마커 정보
                    selected.location ? (
                        <InfoWindow
                            position ={selected.location}
                            clickable={true}
                            onCloseClick={()=>setSelected({})}
                            >
                            <div className="infowindow">
                                <p>{selected.name}</p>
                                <img src={selected.image} className="small-image" alt="rental"/>
                                <p>주소:{selected.address}</p>
                                <Row>
                                    <Col xs={6} md={4}>
                                        <Image src="https://image.flaticon.com/icons/svg/3198/3198467.svg" rounded />
                                    </Col>
                                </Row>
                            </div>
                        </InfoWindow>
                    )
                        :null
                }
                {//지역정보 검색
                    searchLocation.lat ?
                        <Marker
                            position={searchLocation}
                            onClick={()=>{
                                setSelected(searchLocation)
                                setInfoShow(true)
                            }}
                            icon={{
                                url: "https://image.flaticon.com/icons/svg/3198/3198467.svg",
                                scaledSize: new window.google.maps.Size(40, 40)
                            }}
                            />
                            :null
                    }


                {
                    markers.map((marker,i)=>(
                        <Marker
                            key={i}
                            onClick={()=>{
                                setSelected(marker);
                                setInfoShow(true)
                            }}
                            position={{ lat: marker.lat, lng: marker.lng }}

                            icon={{
                                    url: "https://image.flaticon.com/icons/svg/1786/1786525.svg",
                                    scaledSize : new window.google.maps.Size(40,40)
                            }}
                        />
                    ))
                }
                {//현위치
                    currentPosition.lat ?
                        <Marker
                            position={currentPosition}
                            onClick={() => {
                                setSelected(currentPosition)
                                setInfoShow(true)
                            }}
                            icon={{
                                url: "https://image.flaticon.com/icons/svg/149/149060.svg",
                                scaledSize: new window.google.maps.Size(40, 40)
                            }}
                        />
                        : null
                }
                {
                    mapdata.map((store,i)=>(
                        <Marker
                            key={i}
                            position={{lat:store.x_value, lng:store.y_value}}
                            onClick={
                                ()=>{setSelected(store)
                                    setSelectedAddr(store.street_address)
                                    setContent(store.info);
                                    setName(store.name)

                                }}
                            icon={{
                                url: "https://image.flaticon.com/icons/svg/1786/1786525.svg",
                                scaledSize: new window.google.maps.Size(40, 40)
                            }}
                        />
                    ))
                }
                {/*디비에 저장된 데이터*/}
                {selected.x_value ? (
                        <InfoWindow
                            position={{lat:selected.x_value,lng:selected.y_value}}
                            clickable={true}
                            onCloseClick={()=>setSelected({})}
                        >
                            <div className="infowindow">
                                    <MDBCard>
                                            <MDBCardText className="infowindow">
                                                    <Col xs={6} md={4}>
                                                            <Image className="img-size"
                                                                   src="
                                                                data:image/jpeg;base64,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"
                                                                   rounded />
                                                    </Col>
                                                <p><br/>선택지 이름 : {selected.name}</p>
                                                <p><br/>주소 : {selected.street_address}</p>
                                                <p><br/>내용 : {selected.info}</p>
                                                <p><br/><Link>웹사이트 : {selected.website}</Link></p>
                                                <p><br/>전화번호 : {selected.TelePhone}</p>
                                            </MDBCardText>
                                    </MDBCard>
                            </div>
                        </InfoWindow>
                    )
                    :null
                }

                {/*클릭된 지역ㅋ 데이터*/}
                {//인포윈도우 내용정보
                    infoShow ? (
                            <InfoWindow
                                position={{lat: selected.lat, lng: selected.lng}}
                                // onCloseClick={()=>setSelected({})}
                                onCloseClick={()=>{setInfoShow(false);}}
                                clickable={true}
                            >
                                <div className="infowindow">
                                    <MDBCard>
                                        <MDBCardText className="infowindow">
                                            <Col xs={6} md={4}>
                                                <Image className="img-size"
                                                       src="
                                                                data:image/jpeg;base64,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"
                                                       rounded />
                                            </Col>
                                            <p><br/>도착지(클릭){selected.name}</p>
                                            <p><br/>상세주소 : {selectedAddr}</p>
                                            <p><br/>우편번호 : {selectedPc}</p>
                                            <p><br/>내용 : {selected.info}</p>
                                            {/*<p><br/><Link>웹사이트 : {selected.website}</Link></p>*/}
                                            {/*<p><br/>전화번호 : {selected.TelePhone}</p>*/}
                                        </MDBCardText>
                                    </MDBCard>

                                </div>
                            </InfoWindow>
                    ): null
                    
                }

               
            </GoogleMap>

                    <div className="map_container search_box">
                            <Form.Row className="align-items-center">
                                <Col xs="auto" className="my-lg-4">
                                    <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                                        Preference
                                    </Form.Label>

                                    <Form>
                                        <Form.Group className="map-textbox">
                                            <Form.Label>출발지 주소(검색) : </Form.Label>
                                            <Form.Control type="location" placeholder="starting point" className="map-textbtn" value={searchedAddr}/>
                                        </Form.Group>
                                        <Form.Group className="map-textbox">
                                            <Form.Label>도착지 주소(클릭):</Form.Label>
                                            <Form.Control type="location" placeholder="ending point" className="map-textbtn" value={selectedAddr}/>
                                        </Form.Group>
                                    </Form>
                                </Col>


                                    <div>
                                        <Col  className="my-1 col-auto">
                                            <Button className="map-subbtn">
                                                <MapModal
                                                  name={name}
                                                  content={content}
                                                  startAddr={searchedAddr}
                                                  endAddr={selectedAddr}
                                                  postcode={selectedPc}
                                                />
                                            </Button>
                                        </Col>
                                    </div>
                                    <div>
                                        <Col  className="my-1 col-auto">
                                            <Button type="initialize" className="map-inibtn"

                                            ><Link to="/GooMap"/>초기화</Button>
                                        </Col>
                                    </div>
                            </Form.Row>
                    </div>
                     </div>
        </>
    )
}
export default GooMap;
