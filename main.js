(function () {
    'use strict';

    class CoffeeMachine {
        constructor(cash, coins, coffeeList) {
            this.cash = cash;    //сколько в автомате налички
            this.coins = coins;  // сколько монет в автомате
            this.coffeeList = coffeeList;
            this.currentMoney = 0; // текущий баланс налички 
            this.currentCoins = 0; // текущий баланс монет 
            this.coffeeCost = 0;
            this.coinsRest = {
                2: 0,
                1: 0,
                50: 0,
                25: 0
            }
            this.avtomatBalance = this.cash + this.coins;
            this.validCash = [1, 2, 5, 10];
        }
        CoffeeList(coffeeListContainer) {
            coffeeListContainer.innerHTML = coffeeList.reduce((html, item) => html + `<li class="item" data-name="${item.name}"><div class="item-img"><img src="${item.img}" alt=""></div><div class="item-body"><h3 class="coffee-title">${item.name}</h3><p class="coffee-price">${item.cash} <span>грн.</span> ${item.coins} <span>коп.</span></p></div></li>`, '')
        }
        addCash(value) {
            if (this.validCash.includes(value)) {
                this.currentMoney += value;
                this.cash += value;
                jQuery('.balance-cash').html(this.currentMoney + " грн.");
            } else {
                alert('Wrong money');
            }
        }
        addCoins(value) {
            const validCoins = Object.keys(this.coins);
            console.log(validCoins)
            if (validCoins.includes(value.toString())) {
                if (value > 2) {
                    this.currentCoins += value / 100;
                } else {
                    this.currentCoins += value;
                }
                this.coins[value]++;
                $('.balance-coins').html(this.currentCoins * 100 + " коп.");
            } else {
                alert('Wrong money');
            }
        }


        makingCoffee(value) {
            $('.balance p').html('Processing...');
            $('#count .progress').css('width', '0').animate({ 'width': '100%' }, 3000);
            $('.finish').html(`<img class="finish-img" src="${value.img}" alt="">`);
            $('.finish-img').css('bottom', '100%');
            setTimeout(function () {
                $('.balance p').html(`Your ${value.name} is ready`);
                $('.finish-img').animate({ 'bottom': '1%' }, 1000)
                $('#count .progress').css('width', '0');
                $('#count').html(" ");
            }, 3200)
            setTimeout(function () {
                $('.balance p').html("Enjoy your drink!");
            }, 6000)
            setTimeout(function () {
                $('.balance p').html("Balance");
            }, 8000)



        }

        createCoffee(value) {
            const drinkItem = this.coffeeList.find(item => item.name === value);
            const drinkCash = parseInt(drinkItem.cash);
            let drinkCoins = parseInt(drinkItem.coins);
            if (drinkCoins > 2) {
                drinkCoins = drinkCoins / 100
            }
            const drinkCost = drinkCash + drinkCoins;
            console.log(drinkCost)
            let currentBalance = this.currentMoney + this.currentCoins;
            console.log(currentBalance)
            const restInput = currentBalance - drinkCost;
            let rest = currentBalance - drinkCost;
            console.log(rest)
            if (rest >= 0) {
                do {
                    console.log(rest)
                    if (rest - 2 >= 0) {
                        if (this.coins[2] > 0) {
                            this.coins[2]--;
                            this.coinsRest[2]++;
                        }
                        else if (this.coins[1] > 2) {
                            this.coins[1] = parseInt(this.coins[1]) - 2;
                            this.coinsRest[1] = parseInt(this.coinsRest[1]) + 2;
                        }
                        else if (this.coins[50] > 4) {
                            this.coins[50] = parseInt(this.coins[50]) - 4;
                            this.coinsRest[50] = parseInt(this.coinsRest[50]) + 4;
                        }
                        else if (this.coins[25] > 8) {
                            this.coins[25] = parseInt(this.coins[25]) - 8;
                            this.coinsRest[25] = parseInt(this.coinsRest[25]) + 8;
                        }
                        else {
                            alert("haven't rest, sorry!")
                        }
                        rest -= 2
                    }
                    console.log('2:' + rest);
                    console.log(this.coinsRest);

                    if (rest - 1 >= 0 && rest < 2) {
                        if (this.coins[1] > 1) {
                            this.coins[1] = parseInt(this.coins[1]) - 1;
                            this.coinsRest[1] = parseInt(this.coinsRest[1]) + 1;
                        }
                        else if (this.coins[50] > 2) {
                            this.coins[50] = parseInt(this.coins[50]) - 2;
                            this.coinsRest[50] = parseInt(this.coinsRest[50]) + 2;
                        }
                        else if (this.coins[25] > 4) {
                            this.coins[25] = parseInt(this.coins[25]) - 4;
                            this.coinsRest[25] = parseInt(this.coinsRest[25]) + 4;
                        }
                        else {
                            alert("haven't rest, sorry!")
                        }

                        rest -= 1
                    }
                    console.log("1:" + rest);
                    console.log(this.coinsRest);

                    if (rest - 0.5 >= 0 && rest < 1) {
                        if (this.coins[50] > 1) {
                            this.coins[50] = parseInt(this.coins[50]) - 1;
                            this.coinsRest[50] = parseInt(this.coinsRest[50]) + 1;
                        }
                        else if (this.coins[25] > 2) {
                            this.coins[25] = parseInt(this.coins[25]) - 2;
                            this.coinsRest[25] = parseInt(this.coinsRest[25]) + 2;
                        }
                        else {
                            alert("haven't rest, sorry!")
                        }

                        rest -= 0.5
                    }
                    console.log("0.5:" + rest);
                    console.log(this.coinsRest);

                    if (rest - 0.25 >= 0 && rest < 0.5) {
                        if (this.coins[25] > 1) {
                            this.coins[25] = parseInt(this.coins[25]) - 1;
                            this.coinsRest[25] = parseInt(this.coinsRest[25]) + 1;
                        }
                        else {
                            this.coins[25] = parseInt(this.coins[25]) + 1;
                            this.coinsRest[25] = parseInt(this.coinsRest[25]) - 1;
                            alert("haven't rest, sorry!")
                        }

                        rest -= 0.25
                    }
                    console.log("0.25:" + rest);
                    console.log(this.coinsRest);

                } while (rest > 0)

                console.log(rest);

                if (restInput > 0) {
                    // let restValueContainer = $('#rest-value');
                    // console.log(restValueContainer);
                    // $.each(this.coinsRest, function( key, value ) {
                    //     if(value > 1 && key > 2) {
                    //         restValueContainer.append($('<li>',{text:`${value} ед. по ${key} коп.`}))
                    //         // ( `<li>${value} ед. по ${key} коп.</li>`);

                    //     }
                    //     else if (value > 1) {
                    //         restValueContainer.append( `<li>${value} ед. по ${key} грн.</li>`);
                    //     }
                    // });
                    confirm("Ваша сдача:" + JSON.stringify(this.coinsRest))
                } 
                this.makingCoffee(drinkItem);
                this.currentMoney = 0;
                this.currentCoins = 0;
               

                $('.finish').click(function() {
                    $('.finish-img').css('visibility', 'hidden')

                    if (restInput > 0) {
                        this.coinsRest = {
                            2: 0,
                            1: 0,
                            50: 0,
                            25: 0
                        }
                    }
                    console.log(this.coinsRest)
                })

            }
            else {
                alert(`Недостаточно средств для покупки ${drinkItem.name}. Пожалуйста добавьте еще ${Math.abs(rest)}`)
            }

        }
    }
    const coffeeList = [
        {
            name: "Espresso",
            cash: "10",
            coins: "25",
            img: "../images/espresso1.png" 
        },

        {
            name: "Americano",
            cash: "11",
            coins: "00",
            img: "../images/americano1.png"
        },

        {
            name: "Latte",
            cash: "14",
            coins: "75",
            img: "../images/latte1.png"
        },

        {
            name: "Cappuccino",
            cash: "12",
            coins: "50",
            img: "../images/cappuchino1.png"
        },

        {
            name: "Mochaccino",
            cash: "10",
            coins: "00",
            img: "../images/maccihiato1.png"
        },

        {
            name: "Tea",
            cash: "9",
            coins: "50",
            img: "../images/tea1.png"
        },

        {
            name: "Chocolate",
            cash: "10",
            coins: "25",
            img: "../images/chocolate1.png"
        },

        {
            name: "Cocoa",
            cash: "12",
            coins: "00",
            img: "../images/cocoa1.png"
        }
    ];
    const coffeeListContainer = document.getElementById('coffee-list');
    const machine = new CoffeeMachine(10, { 50: 100, 25: 1000, 1: 10, 2: 1 }, coffeeList);
    machine.CoffeeList(coffeeListContainer);

    $('.close').click(function () {
        $('.cash').removeClass('active');
        $('.coins').removeClass('active');
    })

    $('.cash-accept').click(function () {
        $('.prompt.cash').addClass('active');

    })
    $('.prompt.cash .promt-btn').click(function () {
        const currentMoneyValue = $('#input-cash').val();
        const currentMoney = parseInt(currentMoneyValue);
        machine.addCash(currentMoney);
        $('#input-cash').val('');
    });



    $('.coins-accept').click(function () {
        $('.prompt.coins').addClass('active');
    })
    $('.prompt.coins .promt-btn').click(function () {
        const currentCoinsValue = $('#input-coins').val();
        const currentCoins = parseInt(currentCoinsValue);
        machine.addCoins(currentCoins);
    });


    $('#coffee-list').on('click', '.item', function () {
        const name = $(this).data('name')
        machine.createCoffee(name);
    })
}());

