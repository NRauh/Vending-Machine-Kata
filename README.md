#Vending Machine Kata

My vending machine kata for Pillar.

`vendingmachine.js` and `test/vendingmachinetest.js` are where I put the most effort.
I tried to make the vending machine's functionality like a library which could be applied with different hardware.
`main.js` is just something I threw together to somewhat simulate a vending machine as best as I could with only a terminal.

To use requires NodeJS (and NPM), and running `npm install`

Run tests with `npm test`
Run simulation with `npm start`

Coins:
j = Quarter
k = Dime
l = Nickel
; = Penny (rejected)
h = Bus token (rejected)

Products:
f = Soda $1.00
d = Chips $0.50
s = Candy $0.65
