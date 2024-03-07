import React from "react";

function Square({ chooseSquare, value }) {
    return (
        <div className="square" onClick={ chooseSquare }>
            <p className="mt-3">{ value }</p>
        </div>
    );
};

export default Square;
