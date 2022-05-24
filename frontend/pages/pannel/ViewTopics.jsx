import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

export default function ViewTopics(){

    const [topics, setTopics] = useState([])

    useEffect(()=>{

        function getTopics(){
            axios.get('http://localhost:5000/topic/accepted')
                .then((res)=>{
                    console.log(res.data)
                    setTopics(res.data)
                })
                .catch((err)=>{
                    alert(err.message);
                })
        }

        getTopics();

    },[])

    return(
        <div>
            <h1>Topic Evaluation</h1>


            <table>
                <thead>
                <tr>
                    <th> index </th>
                    <th> Group ID</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {topics.map((topic, index)=>{

                     const passTopic = (topic)=>{
                     let {_id, grp_ID, title, status} = topic;

                     localStorage.setItem('_id', _id)
                     localStorage.setItem('grp_ID', grp_ID)
                     localStorage.setItem('title', title)
                     localStorage.setItem('status',status)
                     }

                    return(
                        <tr>
                            <td key={index}>{index+1}</td>
                            <td>{topic.grp_ID}</td>
                            <td>{topic.title}</td>
                            <td>{topic.status}</td>

                            <td>
                                <Link to={'/addTopicStatus/'+topic._id}>
                                <button onClick={()=>{passTopic(topic)}}>View</button>
                                </Link>
                            </td>
                        </tr>
                    )
                })}
                </tbody>

            </table>
        </div>
    )
}