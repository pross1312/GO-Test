import "./loading.css"
export default function({visible}: {visible: Boolean}) {
    return (
        <div style={{display: visible ? "" : "none"}} className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
        </div>
    );
}