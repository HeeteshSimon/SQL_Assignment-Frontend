import './App.css';
import React, {useState} from 'react';
import { Container, Button, Col, Row} from 'react-bootstrap'

import DisplayTable from './DisplayTable';
import AddUser from './AddUser';
import AggregateComponent from './AggregateComponent';
import Five from './Five';

function App() {
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  return (
    <Container>
      <Row>
        <Col xs="auto">
      <Button className="float-right" style={{marginTop: "3.5%"}} variant="primary" onClick={() => { setShow(true) }}>Add</Button>
      </Col>
      <Col xs="auto">
       <Button variant="primary" style={{marginTop: "3.5%", float: 'right'}} onClick={() => { setShowUpdateModal(true) }}>Update</Button>
      </Col>
       </Row>
     <AddUser show={show} setShow={setShow} />
     <DisplayTable />
     <Five />
     <hr />
     <AggregateComponent />
    </Container>
  );
}

export default App;
