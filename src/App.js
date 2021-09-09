import './App.css';
import React, {useState} from 'react';
import { Container, Button} from 'react-bootstrap'
import DisplayTable from './DisplayTable';
import AddUser from './AddUser';
import UpdateModal from './UpdateModal';
import AggregateComponent from './AggregateComponent';

function App() {
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  return (
    <Container>
      <Button className="float-right" style={{marginTop: "3.5%"}} variant="primary" onClick={() => { setShow(true) }}>Add</Button>
     <AddUser show={show} setShow={setShow} />
     {/* <UpdateModal show={showUpdateModal} setShow={setShowUpdateModal} /> */}
     <DisplayTable />
     <AggregateComponent />
    </Container>
  );
}

export default App;
