import React from 'react';

const AlarmTimes = (props) => (
    <div id="container">
        <p>Alarm:{props.time} | Away:{props.secondsUntil} sec</p>
    </div>
)

export default AlarmTimes;