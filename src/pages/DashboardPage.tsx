import React from 'react'
import { Link } from 'react-router-dom'
import Timer from 'components/Timer'

export default function DashboardPage() {
    return (
        <section>
            <h1>Dashboard</h1>
            <p>This is the dashboard</p>

            <Link to="timers" className="button">
                View Timers
            </Link>
            <Timer />
        </section>
    )
}
