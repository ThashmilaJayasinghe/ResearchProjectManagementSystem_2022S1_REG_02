import React, {useState} from 'react';
import {Grid} from "@mui/material";

const studentRequest =
    {requestedGroup: "group1", requestedGroupID: "G001", supervisorName: "Nuwan", supervisorEmail: "nuwan@gmail.com", topic: "Cloud computing", details: "This is the details", requestedStates: "accepted", evalueatedAt: "2022-05-22"}


const ViewRequests = () => {

    const [request, setRequest] = useState(studentRequest);
    console.log(request)

    return (
        <div style={{marginTop: "50px", width: "50%", margin: "auto"}}>

            <center><h1>Your Request</h1></center>

            <div style={{border: "1px solid black", borderRadius: "10px", margin: "10px", padding: "10px"}}>

                <table width={'100%'}>
                    <tr>
                        <td><b>Requested Topic</b></td>
                        <td>: {request.topic}</td>
                        <td> &nbsp;  &nbsp;  &nbsp;  &nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{paddingTop: "10px"}}><b>Group name</b></td>
                        <td style={{paddingTop: "10px"}}>: {request.requestedGroup}</td>
                    </tr>
                    <tr>
                        <td style={{paddingTop: "10px"}}><b>Group ID</b></td>
                        <td style={{paddingTop: "10px"}}>: {request.requestedGroupID}</td>
                    </tr>
                    <tr>
                        <td style={{paddingTop: "10px"}}><b>Supervisor Email</b></td>
                        <td style={{paddingTop: "10px"}}>: {request.supervisorEmail}</td>
                    </tr>
                    <tr>
                        <td style={{paddingTop: "10px"}}><b>Supervisor Name</b></td>
                        <td style={{paddingTop: "10px"}}>: {request.supervisorName}</td>
                    </tr>
                    <tr>
                        <td style={{paddingTop: "10px"}}><b>Evaluated at</b></td>
                        <td style={{paddingTop: "10px"}}>: {request.evalueatedAt}</td>
                    </tr>

                    <tr>
                        <td style={{paddingTop: "10px"}}><b>States</b></td>
                        {
                            request.requestedStates == "rejected" &&
                            <td style={{paddingTop: "10px", color: "red"}}>: {request.requestedStates}</td>
                        }
                        {
                            request.requestedStates == "accepted" &&
                            <td style={{paddingTop: "10px", color: "green"}}>: {request.requestedStates}</td>
                        }
                        {
                            request.requestedStates != "accepted" && request.requestedStates != "rejected" &&
                            <td style={{paddingTop: "10px"}}>: Pending...</td>
                        }

                    </tr>
                </table>

                {/*<p><b>Requested Topic</b> : {request.topic}</p>*/}
                {/*<p><b>Group name</b> : {request.requestedGroup}</p>*/}
                {/*<p><b>Group ID</b> : {request.requestedGroupID}</p>*/}
                {/*<p><b>Supervisor Email</b> : {request.supervisorEmail}</p>*/}
                {/*<p><b>Supervisor Name</b> : {request.supervisorName}</p>*/}
                {/*<p><b>Evaluated at</b> : {request.evalueatedAt}</p>*/}
                {/*<p><b>States</b> : {request.requestedStates}</p>*/}



            </div>
        </div>
    )
}
export default ViewRequests;