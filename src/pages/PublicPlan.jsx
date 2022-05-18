import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ResultMapRander from './compo/ResultMapRander';
import PlaceNameList from './compo/PlaceNameList';

const PublicPlan = ({userId}) => {
    const params=useParams();
    const planId=params.plan_id;
    const [plan,setPlan]=useState({
        title:'',
        places:[
            {
                id: '',
                place_name: '',
                x: '0',
                y: '0',
                checked:true,
                day:''
            }
        ]}
    );
    const myPlaceList=[...plan.places];

    useEffect(()=>{
        axios.get('/api/publicPlan',{
            params:{planId},
            withCredentials:true
        })
        .then(res=>{
            setPlan(res.data);
        })
        .catch(error=>{
            console.log(error);
        });
    },[]); 

    return (
        <div>
             <h2>plan: {plan.title}</h2>
             <div style={{display:'flex'}}>
                <div style={{width:'15%'}}>
                    장소 목록
                    <PlaceNameList placeData={myPlaceList}/>
                </div>
                <div style={{width:'70%'}}>
                    <ResultMapRander placeData={myPlaceList}/>
                </div>
             </div>
        </div>
    );
};

export default PublicPlan;