import React, {useState} from 'react';
import {evaluate, format} from 'mathjs';
import ActionButton from "./ActionButton";
import Display from "./Display";
import ACTIONS from "../../data/actions.js";

function Calculator() {
    const [expression, setExpression] = useState('');

    const prepareExpression = (expr) => {
        return expr
            .replace(/√(\d+(\.\d+)?)/g, 'sqrt($1)')
            .replace(/\b(sin|cos|tan)\s*(\d+(\.\d+)?)/g, '$1($2 deg)');
    }

    const handleClick = (event) => {
        const element = event.target.textContent;

        switch (element) {
            case '=':
                try {
                    const result = evaluate(prepareExpression(expression));

                    setExpression(format(result, {precision: 6}));
                } catch {
                    alert('Використано хибний формат!');
                }
                break;

            case 'C':
                setExpression('');
                break;

            default:
                setExpression(expression + element);
                break;
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center">Калькулятор</h5>

                            <Display value={expression}/>

                            <div className="row row-cols-4 g-2">
                                {ACTIONS.map((btn, idx) => (
                                    <ActionButton key={idx} label={btn} onClick={handleClick}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
