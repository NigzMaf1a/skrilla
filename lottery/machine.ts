//Rules of
/*
    -- The machine has four displays that each show a number from 0-9.
    --Winning sequences are set by the management
*/
type Machine = {
    displayed: number[];
};

type Slot = {
    position: number;
    value: number;
};

enum Status{
    Undefined = "Undefined",
    Defined = "Defined"
}

const numbers:number[] = [1,2,3,4,5,6,7,8,9];

async function spin(): Promise<number | undefined> {
  if (numbers.length === 0) return undefined;

  const array = new Uint32Array(1);
  crypto.getRandomValues(array);

  return numbers[array[0] % numbers.length];
}


export default class LotteryMachine implements Machine {
    displayed: number[];
    private winningSequence: number[][];

    constructor(winningSequence:number[][]) {
        this.displayed = [0, 0, 0, 0];
        this.winningSequence = winningSequence;
    }

    async pulllever(): Promise<Status> {
    for (const i of this.displayed.keys()) {
        const result = await spin();
        this.displayed[i] = result ?? 0;
    }

    return this.displayed.includes(0)
        ? Status.Undefined
        : Status.Defined;
    }

    async victoryCheck(): Promise<boolean> {
    const res = await this.pulllever();
    if (res !== Status.Defined) return false;

    return this.winningSequence.some(seq =>
        seq.length === this.displayed.length &&
        seq.every((v, i) => v === this.displayed[i])
    );
    }

}
