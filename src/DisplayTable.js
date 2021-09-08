import React, {useEffect, useState} from 'react'
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

export default function DisplayTable(props) {
    const [subject1, setSubject1] = useState([]);
    const [subject2, setSubject2] = useState([]);
    const [subject3, setSubject3] = useState([]);
    const [id, setId] = useState();
    const [name, setName] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
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
            setIsLoaded(true);
          })
          .catch((error) => {
            console.log(error);
          });
    },[])

    const deleteById = (e, ID) =>{
        e.preventDefault();
        console.log(ID);
        axios.get("http://localhost:8080/sqlartifact/delete/"+ID)
        .then((response)=>{
            console.log(response.data);
            window.location.reload();
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
              <td><Button variant="warning">Update</Button>&nbsp;&nbsp;<Button variant="danger" onClick={(e)=>deleteById(e,ID)}>Delete</Button></td>
              </tr>

      ))}
  </tbody>
</Table>
        </div>
    )
}
