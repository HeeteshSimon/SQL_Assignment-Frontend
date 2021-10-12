import './App.css';
import React, {useState} from 'react';
import { Container, Button, Col, Row} from 'react-bootstrap'

import DisplayTable from './DisplayTable';
import AddUser from './AddUser';
import AggregateComponent from './AggregateComponent';
import Five from './Five';
import Filter from './Filter'

function App() {
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  return (
    <Container>
      <Row>
        <Col xs="auto">
      <Button className="float-right" style={{marginTop: "3.5%"}} variant="primary" onClick={() => { setShow(true) }}>Add</Button>
      </Col>
      <Col xs="auto">
       <Button variant="primary" style={{marginTop: "3.5%", float: 'right'}} onClick={() => { setShowUpdateModal(true) }}>Update</Button>
      </Col>
{* Making changes just to get hacktober goodies have to make a new branch itseems *}
       </Row>
     <AddUser show={show} setShow={setShow} />
     <DisplayTable />
     <Five />
     <Button style={{marginTop: '1.8%', marginLeft: '2.2%'}} variant="secondary" onClick={()=>setShowFilterModal(true)}>Apply Filters</Button>
     <Filter show={showFilterModal} setShow={setShowFilterModal}/>
     <hr />
     <AggregateComponent />
    </Container>
  );
}

export default App;
