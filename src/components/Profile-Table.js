import React from 'react'
import {Table} from 'react-bootstrap'

function Profile () {
    return (
        <>
        <Table striped bordered hover>
        <thead>
        <tr>
            <th>#</th>
            <th>@</th>
        </tr>
        </thead>
        <tbody>
            <tr>
            <td>Name</td>
            <td>Kazu</td>
            </tr>
            <tr>
            <td>Account</td>
            <td>Zawap</td>
            </tr>
            <tr>
            <td>Email</td>
            <td>cqc</td>
            </tr>
            <tr>
            <td>BirthDay</td>
            <td>Jan</td>
            </tr>
            <tr>
            <td>Country</td>
            <td>JP</td>
            </tr>
            
        </tbody>
        </Table>
        </>
    )
}

export default Profile