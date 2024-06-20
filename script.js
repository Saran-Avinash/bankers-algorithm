function initializeMatrices() {
    const numProcesses = document.getElementById("numProcesses").value;
    const numResources = document.getElementById("numResources").value;

    const availResDiv = document.getElementById("availableResources");
    availResDiv.innerHTML = '';
    for (let i = 0; i < numResources; i++) {
        availResDiv.innerHTML += `Resource ${i}: <input type="number" id="avail${i}" value="0"><br>`;
    }

    const maxDemandDiv = document.getElementById("maxDemand");
    maxDemandDiv.innerHTML = '';
    for (let i = 0; i < numProcesses; i++) {
        for (let j = 0; j < numResources; j++) {
            maxDemandDiv.innerHTML += `P${i} R${j}: <input type="number" id="max${i}${j}" value="0"><br>`;
        }
    }

    const currentAllocDiv = document.getElementById("currentAllocation");
    currentAllocDiv.innerHTML = '';
    for (let i = 0; i < numProcesses; i++) {
        for (let j = 0; j < numResources; j++) {
            currentAllocDiv.innerHTML += `P${i} R${j}: <input type="number" id="alloc${i}${j}" value="0"><br>`;
        }
    }
}

function runBankersAlgorithm() {
    const numProcesses = parseInt(document.getElementById("numProcesses").value);
    const numResources = parseInt(document.getElementById("numResources").value);

    let available = [];
    for (let i = 0; i < numResources; i++) {
        available.push(parseInt(document.getElementById(`avail${i}`).value));
    }

    let max = [];
    let allocation = [];
    for (let i = 0; i < numProcesses; i++) {
        let maxRow = [];
        let allocRow = [];
        for (let j = 0; j < numResources; j++) {
            maxRow.push(parseInt(document.getElementById(`max${i}${j}`).value));
            allocRow.push(parseInt(document.getElementById(`alloc${i}${j}`).value));
        }
        max.push(maxRow);
        allocation.push(allocRow);
    }

    let need = [];
    for (let i = 0; i < numProcesses; i++) {
        let needRow = [];
        for (let j = 0; j < numResources; j++) {
            needRow.push(max[i][j] - allocation[i][j]);
        }
        need.push(needRow);
    }

    let f = new Array(numProcesses).fill(0);
    let ans = new Array(numProcesses).fill(0);
    let ind = 0;

    for (let k = 0; k < numProcesses; k++) {
        for (let i = 0; i < numProcesses; i++) {
            if (f[i] === 0) {
                let flag = 0;
                for (let j = 0; j < numResources; j++) {
                    if (need[i][j] > available[j]) {
                        flag = 1;
                        break;
                    }
                }

                if (flag === 0) {
                    ans[ind++] = i;
                    for (let y = 0; y < numResources; y++) {
                        available[y] += allocation[i][y];
                    }
                    f[i] = 1;
                }
            }
        }
    }

    let outputText = "";
    let flag = true;

    for (let i = 0; i < numProcesses; i++) {
        if (f[i] === 0) {
            flag = false;
            outputText = "The system is not in a safe state.";
            break;
        }
    }

    if (flag) {
        outputText = "The system is in a safe state.\nSafe sequence is: ";
        for (let i = 0; i < numProcesses - 1; i++) {
            outputText += `P${ans[i]} -> `;
        }
        outputText += `P${ans[numProcesses - 1]}`;
    }

    document.getElementById("output").innerText = outputText;
}
