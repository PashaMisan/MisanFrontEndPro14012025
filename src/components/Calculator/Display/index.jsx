import React from 'react';

function Display({ value }) {
    return (
        <input
            type="text"
            className="form-control text-end mb-3"
            value={value}
            readOnly
        />
    );
}

export default Display;
