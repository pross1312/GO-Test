import { useEffect, useState } from "react";
import { Score, ScoreTable } from "../components/ScoreTable";
import config from "../config";
import { ResponseFormat } from "../ResponseFormat";

interface GroupScore extends Score {
    sum: Number
}

export default function({setLoading}: any) {
    const [scores, setScores] = useState(null as Array<Score> | Score | null);
    useEffect(() => {
        setLoading(true);
        fetch(`${config.SV_ADDR}/list/top10/groupA`).then(async (response: Response) => {
            const body = new ResponseFormat<Array<GroupScore>>(await response.json());
            if (body.error) {
                alert(body.error);
            } else {
                setScores(body.data);
            }
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            alert("Error occurred");
        });
    }, []);
    return (
        <div style={{marginTop: "10px", padding: "10px"}} className="float-block">
        <h2 style={{textAlign: "center"}}>Top 10 of Group A</h2>
            { scores ? <ScoreTable scores={scores} /> : <></> }
        </div>
    );
}