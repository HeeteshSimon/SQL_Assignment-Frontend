import React, {useState} from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import axios from 'axios';

export default function AggregateComponent() {
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
    const onClickAggregateBtn = (e) =>{
        e.preventDefault();
        axios.get(`http://localhost:8080/sqlartifact/operations?function=${functionDropDown}&subject=${subjectDropDown}`)
        .then(res => {
            console.log(res.data);
            setVaule(res.data.value);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div style={{marginBottom: '2%'}}>
            <Row>
            <Col xs="auto">
           <select className="me-sm-2 form-control" name="function" onChange={onChangeFunctionDropDown}>
                <option value="" selected disabled>Select Functionality</option>
               <option value="avg">Average</option>
               <option value="min">Minimum</option>
               <option value="max">Maximum</option>
               </select>
               </Col>
                <Col xs="auto">
           <select name="subject" className="form-control" onChange={onChangeSubjectDropDown}>
                <option value="" selected disabled>Select Subject</option>
               <option value="subject1">Subject 1</option>
               <option value="subject2">Subject 2</option>
               <option value="subject3">Subject 3</option>
               </select>
               </Col>
               <Col xs="auto">
                   <Button onClick={onClickAggregateBtn}>Submit</Button>
                   </Col>
                { value && 'Result: '+Math.floor(value)}
               </Row>
        </div>
    )
}
