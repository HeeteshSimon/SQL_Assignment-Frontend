import React, {useState} from 'react'
import { Modal, Form, Button, Toast } from 'react-bootstrap'
import axios from 'axios';


export default function AddUser(props) {
    const handleClose = () => props.setShow(false);
    const handleShow = () => props.setShow(true);
    const [show, setShow] = useState(false);
    const [name, setName] = useState()
    const [subject1, setSubject1] = useState()
    const [subject2, setSubject2] = useState()
    const [subject3, setSubject3] = useState()

    const handleOnChangeName = (e) =>{
        e.preventDefault();
        setName(e.target.value)
    }
    const handleOnChangeSubject1 = (e) =>{
        e.preventDefault();
        setSubject1(e.target.value)
    }
    const handleOnChangeSubject2 = (e) =>{
        e.preventDefault();
        setSubject2(e.target.value)
    }
    const handleOnChangeSubject3 = (e) =>{
        e.preventDefault();
        setSubject3(e.target.value)
    }
    const addUser = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/sqlartifact/create?name=${name}&subject1=${subject1}&subject2=${subject2}&subject3=${subject3}`)
        .then(res =>
            {
            setShow(true)
            console.log(res.data)})
        .catch(err =>
             console.log(err)
                     
             )
        handleClose()
    }
    return (
        <div>
            <Toast bg="success" onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
            <small>1 sec ago</small>
          </Toast.Header>
          <Toast.Body className="success">Data inserted successfully</Toast.Body>
        </Toast>
            { props.show &&
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Data</Modal.Title>
                </Modal.Header>

                    <Form>
                <Modal.Body>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={handleOnChangeName} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="subject1">
                            <Form.Label>Subject1</Form.Label>
                            <Form.Control type="text" value={subject1} onChange={handleOnChangeSubject1} placeholder="Enter Marks" />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="subject2">
                            <Form.Label>Subject2</Form.Label>
                            <Form.Control type="text" placeholder="Enter Marks" value={subject2} onChange={handleOnChangeSubject2} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="subject3">
                            <Form.Label>Subject3</Form.Label>
                            <Form.Control type="text" placeholder="Enter Marks" value={subject3} onChange={handleOnChangeSubject3} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" type="submit" onClick={addUser}>
                            Submit
                        </Button>
                </Modal.Footer>
                    </Form>
            </Modal>
}
        </div>
    )
}
