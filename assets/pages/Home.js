import React from 'react'
import { connect } from 'react-redux'
import { increase, decrease } from '../actions/count'
import Main_aside from '../containers/main/aside'
import Main_left_section from '../containers/main/left-section'
import Main_center_section from '../containers/main/center-section'

function Home({ number, increase, decrease }) {
    return (
        <section className='home-page' style={{ display: 'flex', justifyContent: 'space-between'}}>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between', width: 670, }}>
                <div style={{ width: 670, height: 495, background: '#000' }}/>
                <Main_left_section/>
                <Main_center_section/>
            </div>
            <Main_aside/>
        </section>
    )
}

export default connect(
    state => ({ pages: state.pages }),
    { increase, decrease }
)(Home)

// Some state changes:
// {number}
// <button onClick={() => increase(1)}>Increase</button>
// <button onClick={() => decrease(1)}>Decrease</button>