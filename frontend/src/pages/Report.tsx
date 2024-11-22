import { BarChart } from '@mui/x-charts/BarChart';
import config from '../config';
import { ResponseFormat } from '../ResponseFormat';
import { useState } from 'react';
import Dropdown from '../components/dropdown';

interface Report {
    level1: number,
    level2: number,
    level3: number,
    level4: number,
}

export default function({setLoading}: any) {
    const subjectMap: object = {
        "Toán": "toan", 
        "Ngữ Văn": "ngu_van", 
        "Ngoại Ngữ": "ngoai_ngu", 
        "Vật Lý": "vat_li", 
        "Hóa Học": "hoa_hoc", 
        "Sinh Học": "sinh_hoc", 
        "Lịch Sử": "lich_su", 
        "Địa Lí": "dia_li", 
        "GDCD": "gdcd", 
    };
    const [report, setData] = useState(null as Report | null);
    const getReport = (subject: string) => {
        setLoading(true);
        fetch(`${config.SV_ADDR}/report/${subject}`).then(async (response: Response) => {
            const body = new ResponseFormat<Report>(await response.json())
            setLoading(false);
            if (body.error) {
                alert(body.error);
            } else if (body.data) {
                console.log(body.data);
                setData(body.data);
            } else {
                throw new Error("Unreachable");
            }
        }).catch((err) => {
            console.log(err);
            alert("Error occurred");
        });
    };
    const onChangeSubject = (subject: string) => {
        getReport(subjectMap[subject as keyof object]);
    };
    return (
        <div style={{display: "flex"}}>
            <BarChart
                xAxis={[{ scaleType: 'band', data: ['Report'] }]}
                series={[{ label: ">= 8", data: [report?.level1 || 0] },
                        { label: ">= 6", data: [report?.level2 || 0] },
                        { label: ">= 4", data: [report?.level3 || 0 ] },
                        { label: "< 4", data: [report?.level4 || 0]}
                        ]}
                width={650}
                height={600}
            />
            <div style={{display: "flex", justifyContent: "center", flexDirection: "row"}}>
                <Dropdown options={Object.keys(subjectMap)} onSelect={onChangeSubject}></Dropdown>
            </div>
        </div>
    );
}