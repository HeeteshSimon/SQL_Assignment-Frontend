import React from 'react'
import { Row, Col } from 'react-bootstrap'


export default function AggregateComponent() {
    return (
        <div>
            <Row>
            <Col xs="auto">
        Functionality
                
           <select className="me-sm-2" name="function" className="form-control">
                <option value="" selected disabled>Select Functionality</option>
               <option value="average">Average</option>
               <option value="min">Minimum</option>
               <option value="max">Maximum</option>
               </select>
               </Col>
               {/* Min.Max */}
                <Col xs="auto">
                    Subject
           <select name="subject" className="form-control">
                <option value="" selected disabled>Select Subject</option>
               <option value="subject1">Subject 1</option>
               <option value="subject2">Subject 2</option>
               <option value="subject3">Subject 3</option>
               </select>
               </Col>
               Result: 
               </Row>
        </div>
    )
}
