import './App.css';
import React, {useState} from 'react';
import { Container, Button} from 'react-bootstrap'
import DisplayTable from './DisplayTable';
import AddUser from './AddUser';

function App() {
  const [show, setShow] = useState(false);
  return (
    <Container>
      <Button className="float-right" style={{marginTop: "3.5%"}} variant="primary" onClick={() => { setShow(true) }}>Add</Button>
     <AddUser show={show} setShow={setShow} />
     <DisplayTable />
    </Container>
  );
}

export default App;
