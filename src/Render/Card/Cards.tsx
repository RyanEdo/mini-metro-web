import React, { useEffect } from "react";
import { Line } from "../../DataStructure/Line";
import { Station } from "../../DataStructure/Station";
import { DisplayStation } from "../../DataStructure/Display";
import { LineCard } from "./LineCard";
import './Cards.scss'
import { StationCard } from "./StationCard";

export function Cards() {

    return(<div className="cards">
        <LineCard/>
        <StationCard/>
    </div>)
}