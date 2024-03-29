export function poissonDiscSampler(width: number, height: number, radius: number) {
  let rng = Math.random;

  let k = 30; // maximum number of samples before rejection
  let radius2 = radius * radius;
  let R = 3 * radius2;
  let cellSize = radius * Math.SQRT1_2;

  let gridWidth = Math.ceil(width / cellSize);
  let gridHeight = Math.ceil(height / cellSize);

  let grid: [number, number][] = new Array(gridWidth * gridHeight);

  let queue: [number, number][] = [];
  let queueSize = 0;

  let sampleSize = 0;


  function far(x: number, y: number) {
    let i = x / cellSize | 0;
    let j = y / cellSize | 0;

    let i0 = Math.max(i - 2, 0);
    let j0 = Math.max(j - 2, 0);
    let i1 = Math.min(i + 3, gridWidth);
    let j1 = Math.min(j + 3, gridHeight);

    for (j = j0; j < j1; ++j) {
      let o = j * gridWidth;

      for (i = i0; i < i1; ++i) {
        let s: number[] = new Array(2);

        if ((s = grid[o + i])) {
          let dx = s[0] - x,
              dy = s[1] - y;

          if (dx * dx + dy * dy < radius2) {
            return false;
          }
        }
      }
    }

    return true;
  }

  function sample(x: number, y: number) {
    let s: [number, number] = [x, y];

    queue.push(s);

    grid[gridWidth * (y / cellSize | 0) + (x / cellSize | 0)] = s;

    sampleSize++;
    queueSize++;

    return s;
  }

  return function () {
    if (!sampleSize) {
      return sample(rng() * width, rng() * height);
    }

    // Pick a random existing sample and remove it from the queue.
    while (queueSize) {
      let i = rng() * queueSize | 0;
      let s = queue[i];

      // Make a new candidate between [radius, 2 * radius] from the existing
      // sample.
      for (let j = 0; j < k; ++j) {
        let a = 2 * Math.PI * rng();
        let r = Math.sqrt(rng() * R + radius2);
        let x = s[0] + r * Math.cos(a);
        let y = s[1] + r * Math.sin(a);

        // Reject candidates that are outside the allowed extent,
        // or closer than 2 * radius to any existing sample.
        if (x >= 0 && x < width && y >= 0 && y < height && far(x, y)) {
          return sample(x, y);
        }
      }

      queue[i] = queue[--queueSize];
      queue.length = queueSize;
    }
  };
};
