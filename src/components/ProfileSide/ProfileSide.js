import React from 'react';
import FollowersCar from '../FollowersCard/FollowersCar';
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../ProfileCard/ProfileCard';
import './ProfileSide.css';

const ProfileSide = () => {
    return (
        <div className="profileSide">
            <LogoSearch/>
            <ProfileCard/>
            <FollowersCar/>
        </div>
    )
}

export default ProfileSide