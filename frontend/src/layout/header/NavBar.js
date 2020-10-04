import React from "react";
import Header from './Header'
import tw from "twin.macro";
const Container = tw.div`relative`;
// import AnimationRevealPage from "../../helpers/AnimationRevealPage"

//화면 상단에 고정되는 메뉴바
const NavBar = () => {
    return (
    <>
    <Header/>
    <Container/>
    </>
    );
};
export default NavBar