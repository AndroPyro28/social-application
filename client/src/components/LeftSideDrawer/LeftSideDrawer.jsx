import React from "react";
import { useSelector } from "react-redux";
import {Image} from 'cloudinary-react';

import {LeftSideDrawerContainer, DrawerContent} from './LeftSideComponent'
function LeftSideDrawer() {
  const { currentUser } = useSelector((state) => state.userReducer);

  return (
    <LeftSideDrawerContainer>

      <DrawerContent bg="lightgray" onClick={() => window.location.assign(`/userProfile/${currentUser.id}`)}>
        <Image publicId={currentUser.profileUrl} cloudName="iamprogrammer"/>
         {currentUser.firstname}&nbsp;{currentUser.lastname}
      </DrawerContent>

      <DrawerContent ibg="whitesmoke" ic="lightblue">
      <i className="fa-solid fa-user-group"></i> <a href="#">Friends</a>
      </DrawerContent>

      <DrawerContent ibg="pink" ic="white">
      <i className="fa-solid fa-bookmark"></i> <a href="#">Saved</a>
      </DrawerContent>

      <DrawerContent ibg="lightgreen" ic="gray">
      <i className="fa-solid fa-clock-rotate-left"></i> <a href="#">Memories</a>
      </DrawerContent>

      <DrawerContent ibg="lightblue" ic="white">
      <i className="fa-solid fa-sitemap"></i> <a href="#">Groups</a>
      </DrawerContent>

      <DrawerContent ibg="yellow" ic="white">
      <i className="fa-solid fa-magnifying-glass-dollar"></i> <a href="#">Marketplace</a>
      </DrawerContent>
      <div className="linebreak"></div>
      <DrawerContent ibg="red" ic="white">
      <i className="fa-solid fa-briefcase-medical"></i> <a href="#">Covid-19 Info</a>
      </DrawerContent>

      <DrawerContent ibg="lightblue" ic="blue">
      <i className="fa-solid fa-gamepad"></i> <a href="#">Gaming</a>
      </DrawerContent>

      <DrawerContent ibg="lightblue" ic="blue">
      <i class="fa-solid fa-tv"></i> <a href="#">Watch</a>
      </DrawerContent>

     

    </LeftSideDrawerContainer>
  );
}

export default LeftSideDrawer;
