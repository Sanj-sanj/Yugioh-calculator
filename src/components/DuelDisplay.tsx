type DISPLAY_DATA = {
    currentLP: number,
    duelistName: string,
    id: number
}

function DuelDisplay ({currentLP, duelistName, id}: DISPLAY_DATA) {
    return (
        <div className="duel-display">
            BAKANA KOTO WO 
            <div className='display-flex'>
                <h2>{duelistName}</h2>
                <div>{currentLP}</div>
            </div>
            {id}
        </div>
    )
}
export default DuelDisplay