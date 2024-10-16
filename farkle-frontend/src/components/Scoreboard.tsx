
export type ScoreboardProp = {
    totalPont: number,
    jelenlegiPont: number,
    koriPontok: number,
    kivalasztott: number
}

const Scoreboard = (prop: ScoreboardProp) => {
  return (
    <div>
        <h5>total/<span>{prop.totalPont}</span></h5>
        <h5>{prop.jelenlegiPont}</h5>
        <h5>round: <span>{prop.koriPontok}</span></h5>
        <h5>round: <span>{prop.kivalasztott}</span></h5>
    </div>
  )
}

export default Scoreboard