import React from "react";
import {Container} from "react-bootstrap";
import {SideBar, TablePage} from "./index";

const Community = () => (
    <>
        <Container className="main-bigboard">
            <div id="page-wrapper-1">
                <div className="main-side">
                    <SideBar/>
                </div>
                <div className="main-board">
                    <TablePage/>
                </div>
            </div>
        </Container>
    </>
);
export default Community
