import React, { useEffect, useState } from 'react'
import axios from "axios";
import {MediaContainer, MediaDataContainer, MediaData} from "./MediaComponent";
import Cookies from 'js-cookie';
import { EmptyStateMent } from '../NavBar/NavBar';
function UserVideos({userId, userData}) {

    const [data, setData] = useState([]);

    useEffect(async () => {
        const res = await axios.post(`http://localhost:3001/api/getUserMedia`, {
            userId,
            mediaType: "video"
        }, {
            withCredentials: true,
            headers: {
                accessToken: Cookies.get("userToken")
            }
        });

        setData(res.data.medias)
    }, []);

  return (
    <MediaContainer>
        <MediaDataContainer>

        {
            data.length > 0 ?
            data.map(media => {
                return (
                    <MediaData>
                    <i class="fa-solid fa-pen"></i>
                     <video src={media.dataUrl} controls />
                    </MediaData>
                )
            
            }) : 
            <EmptyStateMent className='emptyStatement'><img src='/images/emptyData.png' />No Videos Uploaded</EmptyStateMent>
        }
            
        </MediaDataContainer>
    </MediaContainer>
  )
}

export default UserVideos