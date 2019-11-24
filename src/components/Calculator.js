import React from 'react';
import Button from './Button';
import Screen from './Screen';
import './Calculator.css';

class Calculator extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.getStartState("");
    }

    getStartState(startValue) {
        var expArr = [];
        expArr.push("N");
        return {
            textValue: startValue,
            expression: expArr,
            isResult: true,
            openALs: 0,
            closeALs: 0
        };
    }

    render() {
        return <div className="calculator-grid">
            <Screen elementClass="screen" text={this.state.textValue} />

            <Button elementClass="button" label="(" action={this.addOpenAlgo.bind(this)} />
            <Button elementClass="button" label=")" action={this.addCloseAlgo.bind(this)} />
            <Button elementClass="wide-button" label="AC" action={this.clearData.bind(this)} />

            <Button elementClass="button" label="7" action={this.addNumber("7").bind(this)} />
            <Button elementClass="button" label="8" action={this.addNumber("8").bind(this)} />
            <Button elementClass="button" label="9" action={this.addNumber("9").bind(this)} />
            <Button elementClass="button" label="/" action={this.addOperator("/").bind(this)} />

            <Button elementClass="button" label="4" action={this.addNumber("4").bind(this)} />
            <Button elementClass="button" label="5" action={this.addNumber("5").bind(this)} />
            <Button elementClass="button" label="6" action={this.addNumber("6").bind(this)} />
            <Button elementClass="button" label="x" action={this.addOperator("*").bind(this)} />

            <Button elementClass="button" label="1" action={this.addNumber("1").bind(this)} />
            <Button elementClass="button" label="2" action={this.addNumber("2").bind(this)} />
            <Button elementClass="button" label="3" action={this.addNumber("3").bind(this)} />
            <Button elementClass="button" label="-" action={this.addOperator("-").bind(this)} />

            <Button elementClass="button" label="0" action={this.addNumber("0").bind(this)} />
            <Button elementClass="button" label="." action={this.addNumber(".").bind(this)} />
            <Button elementClass="button" label="=" action={this.evaluate.bind(this)} />
            <Button elementClass="button" label="+" action={this.addOperator("+").bind(this)} />

        </div>;
    }

    addOpenAlgo() {
        this.addAlgo("(", true);
    }

    addCloseAlgo() {
        this.addAlgo(")", false);
    }

    canCloseAlgo() {
        return this.state.openALs > this.state.closeALs;
    }

    addAlgo(al, isOpen) {
        let textVal = this.state.textValue;
        let expArray = this.state.expression;
        let expValue = expArray[expArray.length - 1];
        
        if (!isOpen && !this.canCloseAlgo()) {
            return;
        }

        if (expValue === "N") {
            // if last input was a number, assume multiplication
            if (textVal.endsWith(".")) {
                textVal = textVal.substr(0, textVal.length - 1);
            }
        }

        expArray.push("AL");
        textVal = `${textVal} ${al} `;
        let closeAlgos = isOpen ? this.state.closeALs : this.state.closeALs + 1;
        let openAlgos = isOpen ? this.state.openALs + 1 : this.state.openALs;

        this.setState({
            textValue: textVal, 
            expression: expArray,
            isResult: false,
            openALs: openAlgos, 
            closeALs: closeAlgos});
    }

    addNumber = (val) => {
        return function() {
            let textVal = this.state.textValue;
            let expArray = this.state.expression;
            let expValue = expArray[expArray.length - 1];
            if (this.state.isResult) {
                textVal = "";
            }
            if (expValue === "OP" || expValue === "AL") {
                expArray.push("N");
            }
            textVal = `${textVal}${val}`;

            this.setState({textValue: textVal, expression: expArray, isResult: false});
        };
    }

    addOperator = (op) => {
        return function() {
            let textVal = this.state.textValue;
            let expArray = this.state.expression;
            let expValue = expArray[expArray.length - 1];
            if (expValue === "N") {
                if (textVal.endsWith(".")) {
                    textVal = textVal.substr(0, textVal.length - 1);
                }
                expArray.push("OP");
                textVal = `${textVal} ${op} `;
            } else if (expValue === "OP") {
                textVal = `${textVal.substr(0, textVal.length - 3)} ${op} `;
            } else if (expValue === "AL") {
                textVal = `${textVal} ${op}`;
            }
            
            this.setState({textValue: textVal, expression: expArray, isResult: false});
        };
    }

    evaluate = () => {
        try {
            let textVal = this.state.textValue;
            
            // ensure close-brackets are properly added
            let openAlgos = this.state.openALs;
            let closeAlgos = this.state.closeALs;
            while (openAlgos > closeAlgos) {
                closeAlgos++;
                textVal = `${textVal} ) `;
            }
            textVal = textVal.replace(/\s+/g, '');

            let stringMath = require('string-math');
            let result = stringMath(textVal);
            
            this.setState(this.getStartState(result.toString()));
        } catch (error) {
            alert(error);
        }
    }

    clearData = () => {
        var newState = this.getStartState("");
        this.setState(newState);
    }
}

export default Calculator;