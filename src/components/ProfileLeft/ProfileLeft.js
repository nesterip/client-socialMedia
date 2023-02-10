import React from 'react';
import FollowersCar from '../FollowersCard/FollowersCar';
import LogoSearch from '../LogoSearch/LogoSearch';
import InfoCard from '../InfoCard/InfoCard';
import './ProfileLeft.css';

const ProfileLeft = () => {
    return (
        <div className="profileSide">
            <LogoSearch/>
            <InfoCard/>
            <FollowersCar/>
        </div>
    )
}

export default ProfileLeft