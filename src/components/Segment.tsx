import React from 'react'
import { Segment as SegmentType } from 'slices/activeTimer'

interface SegmentProps {
    segment: SegmentType,
    active: boolean,
}

export default function Segment({ segment: { timer, elapsedTime }, active }: SegmentProps) {

    const size = active ? "50px" : "20px"
    const color = active ? "black" : "grey"
    const speed = 0.3
    return (
        <div className="segment">
            <h3>{timer.title}</h3>
            <p>{timer.description}</p>
            <div className="segment__elapsed" style={{
                margin: size,
                fontSize: size,
                color: color,
                transitionTimingFunction: "ease-in",
                transition: `margin ${speed}s, fontSize ${speed}s, color ${speed}s`
            }}>
                {timer.timerLength ? `${((timer.timerLengthMs - elapsedTime) / 1000).toFixed(3)}s` : '--'}
            </div>
        </div>
    )
}
