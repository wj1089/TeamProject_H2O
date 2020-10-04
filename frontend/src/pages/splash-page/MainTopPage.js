import React, { useState }  from 'react';
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import AnimationRevealPage from "../../helpers/AnimationRevealPage"
import Header from "../../layout/header/Header";
import {Link} from "react-router-dom";
import { ReactComponent as SvgDecoratorBlob1 } from "../../helpers/images/svg-decorator-blob-1.svg";
import DesignIllustration from "../../helpers/images/design-illustration-2.svg";
import CustomersLogoStripImage from "../../helpers/images/customers-logo-strip.png";
import Geocode from "react-geocode";


const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = tw.h2`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

const CustomersLogoStrip = styled.div`
  ${tw`mt-12 lg:mt-20`}
  p {
    ${tw`uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500`}
  }
  img {
    ${tw`mt-4 w-full lg:pr-16 xl:pr-32 opacity-50`}
  }
`;

const MainTopPage = () => {

  const [location, setLocation] = useState("세브란스병원")
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);
  Geocode.setLanguage("kr");
  Geocode.setRegion("kr");
  Geocode.fromAddress(location).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      sessionStorage.setItem("search",JSON.stringify({lat,lng}))
    },
    error => {
      console.error(error);
    }
  );
  return (
    <>
    <AnimationRevealPage>
      <Header/>
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              <span tw="text-primary-500">Easy to Search!</span>
            </Heading>
            <Paragraph>
            [ 간편하게 원하는 병원 찾기 ]
            </Paragraph>
            <Actions>
              <input 
              type="text" 
              placeholder="Search Hospital" 
              value={location}
              onChange={e => setLocation(e.target.value)}
              />
              <Link to="/SearchHospital">
              <button>Click!</button>
              </Link>
            </Actions>
            <CustomersLogoStrip>
              <p>Our TRUSTED Customers</p>
              <img src={CustomersLogoStripImage} alt="Our Customers" />
            </CustomersLogoStrip>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img tw="min-w-0 w-full max-w-lg xl:max-w-3xl" src={DesignIllustration} alt="Design Illustration" />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
      </AnimationRevealPage>
    </>
  );
};

export default MainTopPage
