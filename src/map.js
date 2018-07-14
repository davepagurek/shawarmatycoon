import { Shop } from './shop';

import 'p5';
import { Student } from './student';

export class Map {
    CELL_SIZE = 30;

    constructor() {
        this.shops = [new Shop([], 0.5, 10, {x: 5, y: 5}, 100)];
        this.students = [new Student({x: 200, y:145},8), new Student({x: 403,y: 130})];
    }

    userShop() {
        return shops[0];
    }

    hire() {
        userShop().addEmployee(Math.random());
        tick();
    }

    fire() {
        userShop().removeEmployee();
        tick();
    }

    upgrade() {
        userShop().setEquipmentQuality(Math.min(10, userShop().equipmentQuality + 1));
        tick();
    }

    tick() {
        
        //list of shops
        var potentialShops = [];

        //for each student
        this.students.forEach(s => {

            //find shop that they are willing to go at
            this.shops.forEach(shop => {
                if (s.willPurchaseFrom(shop.location,shop.price)){
                    potentialShops.push(shop);
                }
            });

            if(potentialShops.length > 0){
                //select a random shop from potential ones
                var selectedShop = this.potentialShops[Math.floor(Math.random() * potentialShops.length)];

                //receive a shawarma - updates the shops
                selectedShop.serveShawarma();
            } else {
                //die if can't eat
                s.die();
            }
            
        });

        this.students = this.students.filter(s => s.isAlive == true);
    }

    draw() {
        this.shops.forEach(shop => {
            push();
            translate(shop.location.x * 30, shop.location.y * 30);
            shop.draw();
            pop();
        });
    }
}
