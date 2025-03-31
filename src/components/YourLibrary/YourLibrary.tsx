import React from "react";
import SubLibrary from "../SubLibrary/SubLibrary";

const YourLibrary = () => {
    return (
        <div>
            <SubLibrary
                title="Create your first playlist"
                subTitle="It's easy, we'll help you"
                textBtn="Create playlist"
            />
            <SubLibrary
                title="Let's find some podcasts to follow"
                subTitle="We'll keep you updated on new episodes"
                textBtn="Browse podcasts"
            />
        </div>
    );
};

export default YourLibrary;
