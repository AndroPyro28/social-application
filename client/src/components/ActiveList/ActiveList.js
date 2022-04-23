import React, { useEffect, useState } from 'react'
import { ActiveListContainer, ActiveListHeader, ActiveListBody, ActiveListFooter} from "./ActiveListComponent";
import Friends from './Friends';
import axios from 'axios';
import Cookies from "js-cookie";
import { EmptyStateMent } from '../NavBar/NavBar';
function ActiveList({toggleActiveList, setToggleActiveList}) {
    
    const [searchToggle, setSearchToggle] = useState(false);
    const [friends, setFriends] = useState();
    useEffect(async () => {
      
      if(toggleActiveList) {
        const res = await axios.get('http://localhost:3001/api/getAllFriends', {
        withCredentials: true,
        headers: {
          accessToken: Cookies.get('userToken')
        }
      })
        const {friends} = res.data;

        setFriends(friends);
      }
      

    }, [toggleActiveList])

    const fetchActiveList = friends?.length > 0 ? friends?.map((friend, index) => {
      return (
        <Friends friend={friend} index = {index} key={index}/>
      )
    }) : (<EmptyStateMent style={{color:"gray"}}><span className="fa-solid fa-magnifying-glass-plus"></span> Find friends</EmptyStateMent>)

  return (
    <ActiveListContainer toggleActiveList={toggleActiveList}>

        <ActiveListHeader onClick={() => setToggleActiveList(false)}> <i className="fa-solid fa-address-book"></i>&nbsp;Contacts</ActiveListHeader>
        <ActiveListBody>
            {
              fetchActiveList
            }
        </ActiveListBody>
        <ActiveListFooter>

        {
            searchToggle && <input type="text" placeholder='Search Friends...'/>
        }

        <i className="fa-solid fa-magnifying-glass" onClick={() => setSearchToggle(!searchToggle)}></i>
        </ActiveListFooter>
    </ActiveListContainer>
  )
}

export default ActiveList