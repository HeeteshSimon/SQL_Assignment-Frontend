import React, {useEffect, useState} from 'react'
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

export default function DisplayTable(props) {
    const [subject1, setSubject1] = useState([]);
    const [subject2, setSubject2] = useState([]);
    const [subject3, setSubject3] = useState([]);
    const [average, setAverage] = useState([]);
    const [id, setId] = useState();
    const [name, setName] = useState([]);
    const [updateData, setUpdateData] = useState();
    const [show, setShow] = useState(false);
    const [Data, setData] = useState([]);
    const [updateId, setUpdateId] = useState(); 
    const [NameUpdate, setNameUpdate] = useState();
    const [Subject1Update, setSubject1Update] = useState();
    const [Subject2Update, setSubject2Update] = useState();
    const [Subject3Update, setSubject3Update] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        axios.get('http://localhost:8080/sqlartifact/get')
        .then((response) => {
            console.log(response.data)
            setId(JSON.parse(response.data.id));
            setName(JSON.parse(response.data.name));
            setSubject1(JSON.parse(response.data.subject1));
            console.log(JSON.parse(response.data.subject1))
            setSubject2(JSON.parse(response.data.subject2));
            setSubject3(JSON.parse(response.data.subject3)); 
            setAverage(JSON.parse(response.data.average));
          })
          .catch((error) => {
            console.log(error);
          });
    },[updateData])

    const deleteById = (e, ID) =>{
        e.preventDefault();
        console.log(ID);
        axios.get("http://localhost:8080/sqlartifact/delete/"+ID)
        .then((response)=>{
            console.log(response.data);
            // window.location.reload();
            setUpdateData(Math.random());
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const upDatebyId = async (e, ID) =>{
        e.preventDefault();
        console.log(ID);
        setUpdateId(ID);
        handleShow();
        const response = await axios.get("http://localhost:8080/sqlartifact/get/"+ID)
        console.log(response.data);
        // setData(response.data);
        setData(response.data);
        setNameUpdate(response.data.name);
        setSubject1Update(response.data.subject1);
        setSubject2Update(response.data.subject2);
        setSubject3Update(response.data.subject3);

    }
    const handleOnChangeName = (e) =>{
        e.preventDefault();
        setNameUpdate(e.target.value)
    }
    const handleOnChangeSubject1 = (e) =>{
        e.preventDefault();
        setSubject1Update(e.target.value)
    }
    const handleOnChangeSubject2 = (e) =>{
        e.preventDefault();
        setSubject2Update(e.target.value)
    }
    const handleOnChangeSubject3 = (e) =>{
        e.preventDefault();
        setSubject3Update(e.target.value)
    }
    const onClickUpdateBtn = (e) =>{
        e.preventDefault();
        console.log(updateId);
        axios.get(`http://localhost:8080/sqlartifact/update/${updateId}/?name=${NameUpdate}&subject1=${Subject1Update}&subject2=${Subject2Update}&subject3=${Subject3Update}`)
        .then((response)=>{
            console.log(response.data);
            // window.location.reload();
            handleClose();
            setUpdateData(Math.random());
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div style={{marginTop: '2%'}}>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>S.No.</th>
      <th>Name</th>
      <th>Subject 1</th>
      <th>Subject 2</th>
      <th>Subject 3</th>
      <th>Average</th>
      <th>Result</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
      {id && id.map((ID, index)=>(
          <tr key={ID}>
              <td>{index+1}</td>
              <td>{name[index]}</td>
              <td>{subject1[index]}</td>
              <td>{subject2[index]}</td>
              <td>{subject3[index]}</td>
              <td>{Math.floor(average[index])}</td>
              <td><Alert variant={average[index]>=50?"success":"danger"}>{average[index]>=50?"Pass":"Fail"}</Alert></td>
              <td><Button variant="warning" onClick={(e)=>upDatebyId(e,ID)}>Update</Button>&nbsp;&nbsp;<Button variant="danger" onClick={(e)=>deleteById(e,ID)}>Delete</Button></td>
              </tr>

      ))}
  </tbody>
</Table>
<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Data</Modal.Title>
        </Modal.Header>
          <Form>
        <Modal.Body>
        </Modal.Body>
        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" value={NameUpdate} onChange={handleOnChangeName} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="subject1">
                            <Form.Label>Subject1</Form.Label>
                            <Form.Control type="text" value={Subject1Update} onChange={handleOnChangeSubject1} placeholder="Enter Marks" />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="subject2">
                            <Form.Label>Subject2</Form.Label>
                            <Form.Control type="text" placeholder="Enter Marks" value={Subject2Update} onChange={handleOnChangeSubject2} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="subject3">
                            <Form.Label>Subject3</Form.Label>
                            <Form.Control type="text" placeholder="Enter Marks" value={Subject3Update} onChange={handleOnChangeSubject3} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClickUpdateBtn}>Update</Button>
        </Modal.Footer>
          </Form>
      </Modal>
        </div>
    )
}
