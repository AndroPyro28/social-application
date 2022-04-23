import React, { useEffect, useState } from 'react'
import axios from "axios";
import {MediaContainer, MediaDataContainer, MediaData} from "./MediaComponent";
import Cookies from 'js-cookie';
import { EmptyStateMent } from '../NavBar/NavBar';
function UserPhotos({userId, userData}) {

    const [data, setData] = useState([]);

    useEffect(async () => {
        const res = await axios.post(`http://localhost:3001/api/getUserMedia`, {
            userId,
            mediaType: "image"
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
                        <img src={media.dataUrl} />
                    </MediaData>
                )
            
            }) : 
            <EmptyStateMent className='emptyStatement'><img src='/images/emptyData.png' />No Photos Uploaded</EmptyStateMent>
        }
            
        </MediaDataContainer>
    </MediaContainer>
  )
}

export default UserPhotos