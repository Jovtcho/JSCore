function calcRestaurantBill(paramsArr) {
    let products = paramsArr.filter((el, index) => index % 2 === 0);
    let totalPrice = paramsArr.filter((el, index) => index % 2 !== 0)
        .map(Number)
        .reduce((acc, el) => acc + el);

    return `You purchased ${products.join(", ")} for a total sum of ${totalPrice}`;
}


console.log(calcRestaurantBill(['Beer Zagorka', '2.65', 'Tripe soup', '7.80', 'Lasagna', '5.69']));
console.log(calcRestaurantBill(['Cola', '1.35', 'Pancakes', '2.88']));