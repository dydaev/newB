import React from 'react'
import { connect } from 'react-redux'
import { increase, decrease } from '../actions/count'
import Main_left_section from '../containers/main/left-section'
import Main_center_section from '../containers/main/center-section'

function Home({ number, increase, decrease }) {
    return (
        <div>

            Some state changes:
            {number}
            <button onClick={() => increase(1)}>Increase</button>
            <button onClick={() => decrease(1)}>Decrease</button>
            <div style={{ width: 670, height: 495, background: '#000' }}/>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', }}>
                <Main_left_section/>
                <Main_center_section/>
                <div style={{ width: 250 }} />
            </div>
        </div>
    )
}

export default connect(
    state => ({ number: state.number }),
    { increase, decrease }
)(Home)