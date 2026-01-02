//Rules of the lottery machine go here
/*
    -- The machine has four displays that each show a number from 0-9.
    --Winning sequences are set in the manual
*/
type Machine = {
    displayed: number[];
};

type Slot = {
    position: number;
    value: number;
};

const numbers:number[] = [0,1,2,3,4,5,6,7,8,9];

function spin(): number | undefined {
  if (numbers.length === 0) return undefined;

  const array = new Uint32Array(1);
  crypto.getRandomValues(array);

  return numbers[array[0] % numbers.length];
}


export default class LotteryMachine implements Machine {
    displayed: number[];
    private winningSequence: number[][];
    public slots: number[];

    constructor(winningSequence:number[][]) {
        this.slots = [1, 2, 3, 4]
        this.displayed = [0, 0, 0, 0];
        this.winningSequence = winningSequence;
    }

    pulllever(){
        for(const disp of this.displayed.keys()){
            const result = spin();
            this.displayed[disp] = result !== undefined ? result : 0;
        }
    }
}