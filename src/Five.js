import React, {useState} from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';
export default function Five() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState([]);
    const [subject1, setSubject1] = useState([]);
    const [subject2, setSubject2] = useState([]);
    const [subject3, setSubject3] = useState([]);
    const [type, setType] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const topFive = (e) =>{
        e.preventDefault();
        setType("Top Five");
        axios.get(`http://localhost:8080/sqlartifact/five/DESC`)
        .then(res => {
            console.log(res.data);
            setSubject1(JSON.parse(res.data.subject1));
            setSubject2(JSON.parse(res.data.subject2));
            setSubject3(JSON.parse(res.data.subject3));
            setName(JSON.parse(res.data.name));
            handleShow();
        })
        .catch(err => {
            console.log(err);
        })
    }
    const bottomFive = (e) =>{
        e.preventDefault();
        setType("Bottom Five");
        axios.get(`http://localhost:8080/sqlartifact/five/ASC`)
        .then(res => {
            console.log(res.data);
            setSubject1(JSON.parse(res.data.subject1));
            setSubject2(JSON.parse(res.data.subject2));
            setSubject3(JSON.parse(res.data.subject3));
            setName(JSON.parse(res.data.name));
            handleShow();
        })
    }
    return (
        <div>
            <Button variant="success" onClick={topFive}>Top Five</Button>&nbsp;&nbsp;
            <Button variant="warning" onClick={bottomFive}>Bottom Five</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{type}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>S.No.</th>
                    <th>Name</th>
                    <th>Subject 1</th>
                    <th>Subject 2</th>
                    <th>Subject 3</th>
                    </tr>
                </thead>
                <tbody>
                    {name && name.map((Name, index)=>(
                        <tr key={Name}>
                            <td>{index+1}</td>
                            <td>{Name}</td>
                            <td>{subject1[index]}</td>
                            <td>{subject2[index]}</td>
                            <td>{subject3[index]}</td>
                            </tr>

                    ))}
                </tbody>
</Table>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
