import "./ScoreTable.css"
export interface Score {
    sbd: String;
    toan: Number;
    ngu_van: Number;
    ngoai_ngu: Number;
    vat_li: Number;
    hoa_hoc: Number;
    sinh_hoc: Number;
    lich_su: Number;
    dia_li: Number;
    gdcd: Number;
    ma_ngoai_ngu: String;
};
export function ScoreTable({scores}: {scores: Score | Array<Score> | null}) {
    if (scores && !(scores instanceof Array)) {
        scores = [scores];
    }
    return (
        <table>
            <thead>
            <tr>
                <th>SBD</th>
                <th>Toán</th>
                <th>Ngữ Văn</th>
                <th>Ngoại Ngữ</th>
                <th>Vật Lí</th>
                <th>Hóa Học</th>
                <th>Sinh Học</th>
                <th>Lịch Sử</th>
                <th>Địa Lí</th>
                <th>GDCD</th>
                <th>Mã Ngoại Ngữ</th>
            </tr>
            </thead>
            <tbody>
            {scores ? scores.map((score, index) =>
                <tr key={index}>
                    <td>{score.sbd}</td>
                    <td>{score.toan?.toString() || "-"}</td>
                    <td>{score.ngu_van?.toString() || "-"}</td>
                    <td>{score.ngoai_ngu?.toString() || "-"}</td>
                    <td>{score.vat_li?.toString() || "-"}</td>
                    <td>{score.hoa_hoc?.toString() || "-"}</td>
                    <td>{score.sinh_hoc?.toString() || "-"}</td>
                    <td>{score.lich_su?.toString() || "-"}</td>
                    <td>{score.dia_li?.toString() || "-"}</td>
                    <td>{score.gdcd?.toString() || "-"}</td>
                    <td>{score.ma_ngoai_ngu}</td>
                </tr>
            ) : <></>}
            </tbody>
        </table>
    );
}