import React, {useState} from 'react'
import { Modal, Form, Button, Table, Row, Col } from 'react-bootstrap'
import axios from 'axios'

export default function Filter(props) {
    const handleClose = () => props.setShow(false);
    const handleShow = () => props.setShow(true);
    const [name, setName] = useState([]);
    const [subject1, setSubject1] = useState([]);
    const [subject2, setSubject2] = useState([]);
    const [subject3, setSubject3] = useState([]);
    const [showTable, setShowTable] = useState(false)
    const [functionDropDown, setFunctionDropDown] = useState();
    const [subjectDropDown, setSubjectDropDown] = useState();
    const [value, setVaule] = useState();

    const onChangeSubjectDropDown = (e) =>{
        console.log(e.target.value);
        setSubjectDropDown(e.target.value);
    }
    const onChangeFunctionDropDown = (e) =>{
        console.log(e.target.value);
        setFunctionDropDown(e.target.value);
    }
    const onChangeMarksValue = (e) =>{
        console.log(e.target.value);
        setVaule(e.target.value);
    }
    const onClickAggregateBtn = (e) =>{
        e.preventDefault();
        axios.get(`http://localhost:8080/sqlartifact/filters?filter=${functionDropDown}&subject=${subjectDropDown}&marks=${value}`)
        .then(res => {
            console.log(res.data);
            setSubject1(JSON.parse(res.data.subject1));
            setSubject2(JSON.parse(res.data.subject2));
            setSubject3(JSON.parse(res.data.subject3));
            setName(JSON.parse(res.data.name));
            setShowTable(true)
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <div>
             <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Apply Filters</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                <Col xs="auto">
           <select name="subject" className="form-control" onChange={onChangeSubjectDropDown}>
                <option value="" selected disabled>Select Subject</option>
               <option value="subject1">Subject 1</option>
               <option value="subject2">Subject 2</option>
               <option value="subject3">Subject 3</option>
               </select>
               </Col>
            <Col xs="auto">
           <select className="me-sm-2 form-control" name="function" onChange={onChangeFunctionDropDown}>
                <option value="" selected disabled>Select Filter</option>
               <option value="greater">Greater Than</option>
               <option value="lesser">Less Than</option>
               <option value="equals">Equals to</option>
               </select>
               </Col>
               <Col xs="auto">
                <input type="text" name="value" value={value} className="form-control" onChange={onChangeMarksValue}/>
               </Col>
               <Col xs="auto">
                   <Button onClick={onClickAggregateBtn}>Submit</Button>
                   </Col>
               </Row>
               <br />
                    {  showTable && 
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
                    
                    }
                
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
