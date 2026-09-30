const machineName = "Sawmill";
let outputPerTick = 2;

function describe(name: string, rate: number): string {
  return `${name} produces ${rate} planks per tick`;
}

console.log(describe(machineName, outputPerTick));

// Uncomment these one at a time and hover over them in VS Code:
// outputPerTick = "fast";
// describe(outputPerTick, machineName);
