function calcBmi() {
    let [name, age, weight, height] = arguments;

    let bmi = Math.round(Number(weight) / Math.pow(Number(height / 100), 2));
    let status = (function (bmi) {
        if (bmi < 18.5) {
            return "underweight";
        } else if (bmi < 25) {
            return "normal";
        } else if (bmi < 30) {
            return "overweight";
        } else {
            return "obese";
        }
    })(bmi);

    let person = {
        name: name,
        personalInfo: {
            age: Number(age),
            weight: Number(weight),
            height: Number(height)
        },
        BMI: bmi,
        status: status
    };

    if (status === 'obese') {
        person['recommendation'] = 'admission required';
    }

    return person;
}

console.log(calcBmi('Peter', 29, 75, 182));
console.log(calcBmi('Honey Boo Boo', 9, 57, 137));

