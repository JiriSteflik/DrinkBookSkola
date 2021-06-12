import React from 'react'

const Material = ({cislovporadi,name,eventklik}) => {
    return (
        <div>
            {cislovporadi} - {name}
            <div className='btn' onClick={() => {
                eventklik(name);
            }}>zobraz detail</div>
        </div>
    )
}

export default Material
