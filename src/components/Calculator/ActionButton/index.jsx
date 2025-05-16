import React from 'react';

function ActionButton({label, onClick}) {
    return (
        <div className="col">
            <button className="btn btn-primary w-100" onClick={onClick}>
                {label}
            </button>
        </div>
    );
}

export default ActionButton;
