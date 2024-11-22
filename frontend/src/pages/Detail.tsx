import { FormEvent, useState } from "react";
import {ScoreTable, Score } from "../components/ScoreTable";
import config from "../config";
import { ResponseFormat } from "../ResponseFormat";
import "./Detail.css";

let regId = "";
export default function Detail({setLoading}: any) {
    // const score: Score | null = null;
    const [score, setScore] = useState(null as Score | null);
    const [error, setError] = useState("");

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(regId);
        setError("");
        setScore(null);
        setLoading(true);
        fetch(`${config.SV_ADDR}/detail/${regId}`)
            .then(async (response: Response) => {
                const body = new ResponseFormat<Score>(await response.json());
                setLoading(false);
                if (body.error) {
                    setError(body.error);
                } else if (body.data) {
                    setScore(body.data);
                    console.log(body.data);
                }
            }).catch((err) => {
                console.log(err);
                alert("Error occurred");
            });
    };

    return(
        <div style={{paddingTop: "10px"}}>
        <form style={{padding: "20px 20px"}} className="float-block"
              onSubmit={onSubmit}>
    
            <label>Registration Number: </label> &nbsp;
            <input onChange={(e) => regId = e.currentTarget.value}/>
            <button>Submit</button>
            <p style={{visibility: error === "" ? "hidden" : "visible"}} className="error">{error}</p>
        </form>
        <div style={{padding: "20px 20px", marginTop: "8px"}} className="float-block">
            <h3 style={{marginBottom: "10px"}}>Detail</h3>
            <ScoreTable scores={score}/>
        </div>
        </div>
    );
}